import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, QrCode, CreditCard, CheckCircle2, Check, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Header } from '../organisms/Header';
import { AddressModal, type AddressData } from '../organisms/AddressModal';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/orderStore';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, getCartTotal, clearCart, activeCoupon, applyCoupon, removeCoupon, removeItem } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const addOrder = useOrderStore(state => state.addOrder);

  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [couponInput, setCouponInput] = useState(activeCoupon || '');
  const [toastConfig, setToastConfig] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToastConfig({ message, type });
    setTimeout(() => setToastConfig(null), 3000);
  };
  
  const [isWaitingPaymentModalOpen, setIsWaitingPaymentModalOpen] = useState(false);
  const [isOrderConfirmedModalOpen, setIsOrderConfirmedModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState<AddressData | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    }
    if (items.length === 0) {
      navigate('/cardapio');
    }
  }, [isAuthenticated, items, navigate]);

  useEffect(() => {
    if (location.state?.showToast) {
      showToastMessage('Cupom aplicado com sucesso!', 'success');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  if (!isAuthenticated || items.length === 0) return null;

  const subtotal = getCartTotal();
  const deliveryFee = deliveryOption === 'delivery' ? 5.00 : 0;
  
  let discount = 0;
  if (activeCoupon === 'RAIZES20') discount = subtotal * 0.20;
  else if (activeCoupon === 'BEMVINDO10' || activeCoupon === 'RAIZES10') discount = subtotal * 0.10;
  else if (activeCoupon === 'FRETE0' && deliveryOption === 'delivery') discount = deliveryFee;

  const total = subtotal + deliveryFee - discount;

  const formatPrice = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleApplyCouponClick = () => {
    const success = applyCoupon(couponInput);
    if (success) {
      showToastMessage('Cupom aplicado com sucesso!', 'success');
    } else {
      removeCoupon();
      showToastMessage('Cupom inválido ou expirado', 'error');
    }
  };

  const handleConfirmOrder = () => {
    if (deliveryOption === 'delivery' && !address) {
      showToastMessage('Por favor, cadastre um endereço de entrega.', 'error');
      setIsAddressModalOpen(true);
      return;
    }

    setIsWaitingPaymentModalOpen(true);
    
    // Simula o processamento do pagamento
    setTimeout(() => {
      setIsWaitingPaymentModalOpen(false);
      setIsOrderConfirmedModalOpen(true);
      
      addOrder({
        customer: user?.name || 'Cliente',
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          additionals: item.additionals
        })),
        total: total,
        status: 'pending',
        deliveryOption: deliveryOption!,
        address: address
      });
    }, 3000); // 3 segundos de simulação
  };

  const handleFinishProcess = () => {
    setIsOrderConfirmedModalOpen(false);
    navigate('/acompanhamento', { state: { deliveryOption, address } });
  };

  const isFormValid = deliveryOption === 'pickup' || (deliveryOption === 'delivery' && address !== null);

  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-8 md:px-20 md:py-10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/cardapio')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </button>
          <h1 className="text-2xl md:text-[32px] font-bold text-text-primary m-0">Finalizar Pedido</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Formulários (Coluna Esquerda no Desktop) */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            
            {/* Delivery Option */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-bold text-text-primary m-0">Opção de Entrega</h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setDeliveryOption('delivery')}
                  className={`flex-1 py-3 md:py-4 px-4 rounded-2xl text-sm md:text-base font-semibold transition-colors border ${
                    deliveryOption === 'delivery' 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-gray-200 text-text-secondary hover:border-primary cursor-pointer'
                  }`}
                >
                  Entregar no meu endereço
                </button>
                <button
                  onClick={() => setDeliveryOption('pickup')}
                  className={`flex-1 py-3 md:py-4 px-4 rounded-2xl text-sm md:text-base font-semibold transition-colors border ${
                    deliveryOption === 'pickup' 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-gray-200 text-text-secondary hover:border-primary cursor-pointer'
                  }`}
                >
                  Retirar na Loja
                </button>
              </div>

              {deliveryOption === 'delivery' && (
                <div className="bg-bg-surface p-4 md:p-6 rounded-2xl flex flex-col gap-2">
                  <span className="font-semibold text-text-primary text-sm md:text-base">Endereço de Entrega</span>
                  {address ? (
                    <>
                      <p className="text-text-secondary text-sm md:text-base m-0">
                        {address.street}, {address.number} {address.complement && `- ${address.complement}`}<br/>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="text-primary font-semibold text-sm md:text-base self-start mt-2 hover:underline cursor-pointer"
                      >
                        Alterar endereço
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-text-secondary text-sm md:text-base m-0">Nenhum endereço cadastrado.</p>
                      <button 
                        onClick={() => setIsAddressModalOpen(true)}
                        className="text-primary font-semibold text-sm md:text-base self-start mt-2 hover:underline cursor-pointer"
                      >
                        Cadastrar endereço
                      </button>
                    </>
                  )}
                </div>
              )}

              {deliveryOption === 'pickup' && (
                <div className="bg-orange-50 p-4 md:p-6 rounded-2xl flex flex-col gap-2 border border-primary/20">
                  <span className="font-semibold text-text-primary text-sm md:text-base">Endereço de Retirada (Loja Principal)</span>
                  <p className="text-text-secondary text-sm md:text-base m-0">
                    Av. Agamenon Magalhães, 444 - Maurício de Nassau<br/>
                    Caruaru - PE, 55012-290
                  </p>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-bold text-text-primary m-0">Forma de Pagamento</h2>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl border-2 transition-colors text-left cursor-pointer ${
                    paymentMethod === 'pix' ? 'border-primary bg-orange-50/30' : 'border-gray-100 hover:border-primary/50'
                  }`}
                >
                  <QrCode className={`w-6 h-6 md:w-8 md:h-8 ${paymentMethod === 'pix' ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`flex-1 font-semibold text-sm md:text-base ${paymentMethod === 'pix' ? 'text-text-primary' : 'text-text-secondary'}`}>
                    PIX
                  </span>
                  {paymentMethod === 'pix' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </button>

                <button
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl border-2 transition-colors text-left cursor-pointer ${
                    paymentMethod === 'credit_card' ? 'border-primary bg-orange-50/30' : 'border-gray-100 hover:border-primary/50'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 md:w-8 md:h-8 ${paymentMethod === 'credit_card' ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`flex-1 font-semibold text-sm md:text-base ${paymentMethod === 'credit_card' ? 'text-text-primary' : 'text-text-secondary'}`}>
                    Cartão de Crédito
                  </span>
                  {paymentMethod === 'credit_card' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </button>
              </div>
            </section>
          </div>

          {/* Resumo e Cupons (Coluna Direita no Desktop) */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 lg:gap-8">
            
            {/* Coupon Section */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
              <h2 className="text-lg md:text-xl font-bold text-text-primary m-0">Cupom de Desconto</h2>
              <div className="flex gap-3">
                <Input 
                  placeholder="RAIZES20" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyCouponClick} className="h-full">
                  Aplicar
                </Button>
              </div>
            </section>

            {/* Order Summary Section */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-bold text-text-primary m-0">Resumo do Pedido</h2>
              
              <div className="flex flex-col gap-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-3">
                    <div className="flex flex-col flex-1">
                      <span className="text-text-secondary text-sm font-medium">
                        {item.quantity}x {item.name}
                      </span>
                      {item.additionals && item.additionals.length > 0 && (
                        <div className="flex flex-col mt-1 mb-1 pl-2 border-l-2 border-gray-100">
                          {item.additionals.map((add, idx) => (
                            <span key={idx} className="text-xs text-gray-500 leading-snug">
                              + {add.name} <span className="text-gray-400">({formatPrice(add.price)})</span>
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-text-primary font-semibold text-sm mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors p-1 mt-1"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text-primary font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {deliveryOption === 'delivery' && (
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-text-secondary">Taxa de Entrega</span>
                    <span className="text-text-primary font-semibold">{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-success flex items-center gap-2">
                      Desconto {activeCoupon && `(${activeCoupon})`}
                      <button 
                        onClick={() => {
                          removeCoupon();
                          setCouponInput('');
                        }} 
                        className="text-red-500 hover:text-red-600 hover:underline text-xs font-medium transition-colors"
                      >
                        Remover
                      </button>
                    </span>
                    <span className="text-success font-semibold">- {formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                <span className="text-text-primary font-bold text-lg md:text-xl">Total</span>
                <span className="text-primary font-bold text-xl md:text-2xl">{formatPrice(total)}</span>
              </div>

              <Button 
                fullWidth 
                size="lg" 
                onClick={handleConfirmOrder} 
                disabled={!isFormValid || isWaitingPaymentModalOpen}
                className="mt-2"
              >
                {isWaitingPaymentModalOpen ? 'Processando...' : 'Confirmar Pedido'}
              </Button>
            </section>

          </div>

        </div>
      </main>

      <AddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={setAddress}
        initialAddress={address}
      />

      {/* Modal Aguardando Pagamento */}
      {isWaitingPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center gap-4 shadow-xl">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-text-primary">Aguardando Pagamento</h3>
            <p className="text-text-secondary text-sm">Estamos processando as informações. Por favor, aguarde um momento...</p>
          </div>
        </div>
      )}

      {/* Modal Pedido Confirmado */}
      {isOrderConfirmedModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center gap-6 shadow-xl">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <div>
              <h3 className="text-2xl font-bold text-text-primary">Pedido Confirmado!</h3>
              <p className="text-text-secondary text-sm mt-2">
                Seu pagamento foi aprovado e o pedido já está sendo preparado.
              </p>
            </div>
            <Button fullWidth onClick={handleFinishProcess}>
              Acompanhar Pedido
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notificação */}
      {toastConfig && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-transform animate-fade-in-up">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 min-w-[300px]">
            {toastConfig.type === 'success' ? (
              <Check className="w-6 h-6 text-green-500 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            )}
            <span className="text-text-primary font-medium text-sm">{toastConfig.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
