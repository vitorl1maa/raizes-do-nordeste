import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, ChefHat, Bike, Home, Phone, ShoppingBag } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Header } from '../organisms/Header';
import { useCartStore } from '../../store/cartStore';

export const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();

  const { deliveryOption, address } = location.state || {};

  const [orderStatus, setOrderStatus] = useState<'preparing' | 'delivering' | 'delivered'>('preparing');

  useEffect(() => {
    clearCart();

    // 15 minutos -> Saiu para entrega
    const timer1 = setTimeout(() => {
      setOrderStatus('delivering');
    }, 15 * 60 * 1000);

    // 30 minutos -> Entregue
    const timer2 = setTimeout(() => {
      setOrderStatus('delivered');
    }, 30 * 60 * 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [clearCart]);

  const isPickup = deliveryOption === 'pickup';

  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-8 md:px-20 md:py-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Cabeçalho Voltar */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/cardapio')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>
            <h1 className="text-2xl md:text-[32px] font-bold text-text-primary m-0">Acompanhar Pedido</h1>
          </div>

          {/* Card Previsão */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 mb-8">
            <span className="text-text-secondary font-medium">
              {isPickup ? 'Previsão de Retirada' : 'Previsão de Entrega'}
            </span>
            <span className="text-4xl md:text-5xl font-bold text-primary">45 - 55 min</span>
            <span className="text-text-secondary text-sm mt-2">Pedido #10293</span>
          </section>

          {/* Timeline de Status */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-bold text-text-primary mb-6">Status do Pedido</h2>
            
            <div className="flex flex-col gap-0">
              
              {/* Passo 1 - Confirmado */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success z-10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="w-1 h-12 bg-success/20 my-2"></div>
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-text-primary">Pedido Confirmado</h3>
                  <p className="text-sm text-text-secondary">Pagamento aprovado</p>
                </div>
              </div>

              {/* Passo 2 - Preparando */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    orderStatus === 'preparing' ? 'bg-primary text-white animate-pulse' : 'bg-success/20 text-success'
                  }`}>
                    {orderStatus === 'preparing' ? <ChefHat className="w-5 h-5" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div className={`w-1 h-12 my-2 ${orderStatus === 'preparing' ? 'bg-gray-100' : 'bg-success/20'}`}></div>
                </div>
                <div className="pb-8">
                  <h3 className={`font-bold ${orderStatus === 'preparing' ? 'text-primary' : 'text-text-primary'}`}>
                    Preparando seu pedido
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {orderStatus === 'preparing' ? 'A cozinha já está preparando sua comida.' : 'Concluído'}
                  </p>
                </div>
              </div>

              {/* Passo 3 - Saiu para Entrega / Disponível */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    orderStatus === 'delivering' ? 'bg-primary text-white animate-pulse' :
                    orderStatus === 'delivered' ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {orderStatus === 'delivered' ? <CheckCircle2 className="w-6 h-6" /> : 
                     isPickup ? <ShoppingBag className="w-5 h-5" /> : <Bike className="w-5 h-5" />}
                  </div>
                  <div className={`w-1 h-12 my-2 ${orderStatus === 'delivered' ? 'bg-success/20' : 'bg-gray-100'}`}></div>
                </div>
                <div className="pb-8">
                  <h3 className={`font-bold ${
                    orderStatus === 'delivering' ? 'text-primary' :
                    orderStatus === 'delivered' ? 'text-text-primary' : 'text-gray-400'
                  }`}>
                    {isPickup ? 'Disponível para Retirada' : 'Saiu para Entrega'}
                  </h3>
                  <p className={`text-sm ${orderStatus === 'preparing' ? 'text-gray-400' : 'text-text-secondary'}`}>
                    {orderStatus === 'delivering' ? (isPickup ? 'Seu pedido já pode ser retirado!' : 'O entregador já está a caminho.') : 
                     orderStatus === 'delivered' ? 'Concluído' : 'Aguardando etapa anterior...'}
                  </p>
                </div>
              </div>

              {/* Passo 4 - Entregue */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    orderStatus === 'delivered' ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {orderStatus === 'delivered' ? <CheckCircle2 className="w-6 h-6" /> : <Home className="w-5 h-5" />}
                  </div>
                </div>
                <div>
                  <h3 className={`font-bold ${orderStatus === 'delivered' ? 'text-text-primary' : 'text-gray-400'}`}>
                    {isPickup ? 'Pedido Retirado' : 'Pedido Entregue'}
                  </h3>
                  <p className={`text-sm ${orderStatus === 'delivered' ? 'text-text-secondary' : 'text-gray-400'}`}>
                    {orderStatus === 'delivered' ? 'Aproveite sua refeição!' : 'Aguardando etapa anterior...'}
                  </p>
                </div>
              </div>
              
            </div>
          </section>

          {/* Endereço */}
          <section className="bg-bg-surface p-6 rounded-3xl border border-gray-100 mb-8 flex flex-col gap-2">
            <h3 className="font-bold text-text-primary">
              {isPickup ? 'Endereço de Retirada (Loja)' : 'Endereço de Entrega'}
            </h3>
            {isPickup ? (
              <p className="text-text-secondary text-sm m-0">
                Av. Agamenon Magalhães, 444 - Maurício de Nassau<br/>
                Caruaru - PE, 55012-290
              </p>
            ) : address ? (
              <p className="text-text-secondary text-sm m-0">
                {address.street}, {address.number} {address.complement && `- ${address.complement}`}<br/>
                {address.neighborhood}, {address.city} - {address.state}
              </p>
            ) : (
              <p className="text-text-secondary text-sm m-0">Endereço não informado.</p>
            )}
          </section>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-4">
            <Button 
              variant="outline" 
              fullWidth 
              className="flex items-center justify-center gap-2 border-2"
            >
              <Phone className="w-5 h-5" />
              Falar com o Restaurante
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};
