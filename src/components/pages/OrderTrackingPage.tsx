import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, ChefHat, Bike, Home, Phone, ShoppingBag } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Header } from '../organisms/Header';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';

export const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();

  const { orders } = useOrderStore();
  const { user } = useAuthStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const userOrders = orders.filter(o => o.customer === user?.name);

  const statusOrder = ['pending', 'preparing', 'ready', 'delivering', 'completed'];

  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 py-8 md:px-20 md:py-10">
        <div className="w-full">
          
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

          {userOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100 flex flex-col items-center gap-4 mt-8">
              <ShoppingBag size={48} className="text-gray-300" />
              <p className="text-text-secondary text-lg">Você não tem nenhum pedido em andamento.</p>
              <Button onClick={() => navigate('/cardapio')}>Fazer um Pedido</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {userOrders.map((order) => {
                const isPickup = order.deliveryOption === 'pickup';
                const sIdx = statusOrder.indexOf(order.status);
                
                return (
                  <div key={order.id} className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    {/* Card Previsão */}
                    <section className="flex flex-col items-center text-center gap-2 pb-6 border-b border-gray-100">
                      <span className="text-text-secondary font-medium">
                        {isPickup ? 'Previsão de Retirada' : 'Previsão de Entrega'}
                      </span>
                      <span className="text-4xl md:text-5xl font-bold text-primary">45 - 55 min</span>
                      <span className="text-text-secondary text-sm mt-2">Pedido {order.id}</span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full mt-1 text-gray-500">{order.time}</span>
                    </section>

                    {/* Timeline de Status */}
                    <section className="py-2">
                      <h2 className="text-lg font-bold text-text-primary mb-6">Status do Pedido</h2>
                      
                      <div className="flex flex-col gap-0">
                        {/* Passo 1 - Confirmado */}
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${sIdx >= 0 ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'}`}>
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className={`w-1 h-12 my-2 ${sIdx >= 1 ? 'bg-success/20' : 'bg-gray-100'}`}></div>
                          </div>
                          <div className="pb-8">
                            <h3 className="font-bold text-text-primary">Pedido Confirmado</h3>
                            <p className="text-sm text-text-secondary">Enviado para a cozinha</p>
                          </div>
                        </div>

                        {/* Passo 2 - Preparando */}
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              sIdx === 1 ? 'bg-primary text-white animate-pulse' : sIdx > 1 ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {sIdx > 1 ? <CheckCircle2 className="w-6 h-6" /> : <ChefHat className="w-5 h-5" />}
                            </div>
                            <div className={`w-1 h-12 my-2 ${sIdx >= 2 ? 'bg-success/20' : 'bg-gray-100'}`}></div>
                          </div>
                          <div className="pb-8">
                            <h3 className={`font-bold ${sIdx === 1 ? 'text-primary' : sIdx > 1 ? 'text-text-primary' : 'text-gray-400'}`}>
                              Preparando seu pedido
                            </h3>
                            <p className={`text-sm ${sIdx >= 1 ? 'text-text-secondary' : 'text-gray-400'}`}>
                              {sIdx === 1 ? 'A cozinha está preparando sua comida.' : sIdx > 1 ? 'Concluído' : 'Aguardando'}
                            </p>
                          </div>
                        </div>

                        {/* Passo 3 - Saiu para Entrega / Disponível */}
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              sIdx === 2 || sIdx === 3 ? 'bg-primary text-white animate-pulse' : sIdx > 3 ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {sIdx > 3 ? <CheckCircle2 className="w-6 h-6" /> : isPickup ? <ShoppingBag className="w-5 h-5" /> : <Bike className="w-5 h-5" />}
                            </div>
                            <div className={`w-1 h-12 my-2 ${sIdx >= 4 ? 'bg-success/20' : 'bg-gray-100'}`}></div>
                          </div>
                          <div className="pb-8">
                            <h3 className={`font-bold ${sIdx === 2 || sIdx === 3 ? 'text-primary' : sIdx > 3 ? 'text-text-primary' : 'text-gray-400'}`}>
                              {isPickup ? 'Disponível para Retirada' : 'Em Rota de Entrega'}
                            </h3>
                            <p className={`text-sm ${sIdx >= 2 ? 'text-text-secondary' : 'text-gray-400'}`}>
                              {sIdx === 2 || sIdx === 3 ? (isPickup ? 'Seu pedido já pode ser retirado!' : 'O entregador está a caminho.') : sIdx > 3 ? 'Concluído' : 'Aguardando etapa anterior...'}
                            </p>
                          </div>
                        </div>

                        {/* Passo 4 - Entregue */}
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              sIdx === 4 ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {sIdx === 4 ? <CheckCircle2 className="w-6 h-6" /> : <Home className="w-5 h-5" />}
                            </div>
                          </div>
                          <div>
                            <h3 className={`font-bold ${sIdx === 4 ? 'text-text-primary' : 'text-gray-400'}`}>
                              {isPickup ? 'Pedido Retirado' : 'Pedido Entregue'}
                            </h3>
                            <p className={`text-sm ${sIdx === 4 ? 'text-text-secondary' : 'text-gray-400'}`}>
                              {sIdx === 4 ? 'Aproveite sua refeição!' : 'Aguardando etapa anterior...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Endereço */}
                    <section className="bg-bg-surface p-4 md:p-6 rounded-2xl border border-gray-100 flex flex-col gap-2">
                      <h3 className="font-bold text-text-primary">
                        {isPickup ? 'Endereço de Retirada (Loja)' : 'Endereço de Entrega'}
                      </h3>
                      {isPickup ? (
                        <p className="text-text-secondary text-sm m-0">
                          Av. Agamenon Magalhães, 444 - Maurício de Nassau<br/>
                          Caruaru - PE, 55012-290
                        </p>
                      ) : order.address ? (
                        <p className="text-text-secondary text-sm m-0">
                          {order.address.street}, {order.address.number} {order.address.complement && `- ${order.address.complement}`}<br/>
                          {order.address.neighborhood}, {order.address.city} - {order.address.state}
                        </p>
                      ) : (
                        <p className="text-text-secondary text-sm m-0">Endereço não informado.</p>
                      )}
                    </section>

                    {/* Botões de Ação */}
                    <div className="flex flex-col gap-4 mt-auto pt-4">
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
                );
              })}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
