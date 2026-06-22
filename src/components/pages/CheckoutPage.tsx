import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, QrCode, CreditCard, CheckCircle2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Header } from '../organisms/Header';
import { AddressModal, type AddressData } from '../organisms/AddressModal';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card'>('pix');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
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

  if (!isAuthenticated || items.length === 0) return null;

  const subtotal = getCartTotal();
  const deliveryFee = deliveryOption === 'delivery' ? 5.00 : 0;
  const total = subtotal + deliveryFee - discount;

  const formatPrice = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'RAIZES10') {
      setDiscount(subtotal * 0.10);
    } else {
      setDiscount(0);
      alert('Cupom inválido');
    }
  };

  const handleConfirmOrder = () => {
    if (deliveryOption === 'delivery' && !address) {
      alert('Por favor, cadastre um endereço de entrega.');
      setIsAddressModalOpen(true);
      return;
    }

    setIsProcessing(true);
    // Simulando processamento
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert('Pedido realizado com sucesso!');
      navigate('/cardapio');
    }, 1500);
  };

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
              
              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryOption('delivery')}
                  className={`flex-1 py-3 md:py-4 px-4 rounded-2xl text-sm md:text-base font-semibold transition-colors border ${
                    deliveryOption === 'delivery' 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-gray-200 text-text-secondary hover:border-primary cursor-pointer'
                  }`}
                >
                  Entrega em Casa
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
                  placeholder="RAIZES10" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyCoupon} className="h-full">
                  Aplicar
                </Button>
              </div>
            </section>

            {/* Order Summary Section */}
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
              <h2 className="text-lg md:text-xl font-bold text-text-primary m-0">Resumo do Pedido</h2>
              
              <div className="flex flex-col gap-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <span className="text-text-secondary">{item.quantity}x {item.name}</span>
                    <span className="text-text-primary font-medium">{formatPrice(item.price * item.quantity)}</span>
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
                    <span className="text-success">Desconto</span>
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
                disabled={isProcessing}
                className="mt-2"
              >
                {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
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
    </div>
  );
};
