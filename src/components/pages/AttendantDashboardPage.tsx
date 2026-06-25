import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import logo from '../../assets/images/logo-pequeno.png';
import { LogOut, Clock, CheckCircle, ChefHat, Package, ArrowRight, User } from 'lucide-react';

import { useOrderStore, type Order } from '../../store/orderStore';
import { useAttendantAuthStore } from '../../store/attendantAuthStore';

export const AttendantDashboardPage: React.FC = () => {
  const { isLoggedIn, login, logout } = useAttendantAuthStore();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { orders, updateOrderStatus } = useOrderStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'atend' && password === 'atend@2026') {
      login();
      setError('');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleLogout = () => {
    logout();
    setUser('');
    setPassword('');
  };


  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('orderId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Order['status']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('orderId');
    if (id) {
      updateOrderStatus(id, status);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="Raízes" className="w-20" />
            <h1 className="text-2xl font-bold text-text-primary text-center">Acesso Atendente<br/>Raízes do Nordeste</h1>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 text-error rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input 
              label="Usuário"
              type="text" 
              required
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="Digite o usuário"
            />
            <Input 
              label="Senha"
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
            <Button type="submit" fullWidth className="mt-2">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const columns = [
    { id: 'pending', title: 'Novos', icon: <Clock size={20} className="text-orange-500" />, bg: 'bg-orange-50', nextStatus: 'preparing' as const, nextLabel: 'Aceitar' },
    { id: 'preparing', title: 'Em Preparo', icon: <ChefHat size={20} className="text-blue-500" />, bg: 'bg-blue-50', nextStatus: 'ready' as const, nextLabel: 'Pronto' },
    { id: 'ready', title: 'Prontos', icon: <Package size={20} className="text-yellow-500" />, bg: 'bg-yellow-50', nextStatus: 'delivering' as const, nextLabel: 'Enviar' },
    { id: 'delivering', title: 'Em Entrega', icon: <ArrowRight size={20} className="text-purple-500" />, bg: 'bg-purple-50', nextStatus: 'completed' as const, nextLabel: 'Concluir' },
  ];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Raízes" className="h-10" />
          <div>
            <h1 className="font-bold text-xl text-text-primary">Painel do Atendente</h1>
            <p className="text-sm text-text-secondary">Gestão de Pedidos</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <User size={18} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Atendente Master</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-text-secondary cursor-pointer hover:text-error hover:bg-red-50 rounded-full transition-colors"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Dashboard Kanban */}
      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 min-w-max h-full items-start">
          {columns.map(col => (
            <div key={col.id} className="w-[320px] flex flex-col h-full max-h-[calc(100vh-120px)]">
              <div className={`px-4 py-3 rounded-t-2xl ${col.bg} border-b-0 border-x border-t border-gray-200 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  {col.icon}
                  <h2 className="font-bold text-text-primary">{col.title}</h2>
                </div>
                <span className="bg-white text-text-primary text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {orders.filter(o => o.status === col.id).length}
                </span>
              </div>
              
              <div 
                className="bg-gray-50/50 flex-1 border border-gray-200 rounded-b-2xl p-3 flex flex-col gap-3 overflow-y-auto min-h-[200px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id as Order['status'])}
              >
                {orders.filter(o => o.status === col.id).map(order => (
                  <div 
                    key={order.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, order.id)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-3 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                      <div>
                        <span className="text-primary font-bold">{order.id}</span>
                        <p className="font-semibold text-text-primary text-sm mt-1">{order.customer}</p>
                      </div>
                      <span className="text-xs text-text-secondary font-medium bg-gray-100 px-2 py-1 rounded-md">{order.time}</span>
                    </div>
                    
                    <div className="flex flex-col gap-1 my-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex flex-col mb-1">
                            <span className="text-sm text-text-secondary font-medium">
                              • {item.quantity}x {item.name}
                            </span>
                            {item.additionals && item.additionals.length > 0 && (
                              <div className="pl-3 flex flex-col">
                                {item.additionals.map((add, idx) => (
                                  <span key={idx} className="text-xs text-gray-500">
                                    + {add.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    
                    <div className="pt-2 flex items-center justify-between mt-auto">
                      <span className="font-bold text-text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => updateOrderStatus(order.id, col.nextStatus)}
                      >
                        {col.nextLabel}
                      </Button>
                    </div>
                  </div>
                ))}
                {orders.filter(o => o.status === col.id).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-text-secondary opacity-50">
                    <CheckCircle size={32} className="mb-2" />
                    <p className="text-sm font-medium">Nenhum pedido</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Concluídos */}
          <div className="w-[320px] flex flex-col h-full max-h-[calc(100vh-120px)] opacity-60 hover:opacity-100 transition-opacity">
            <div className="px-4 py-3 rounded-t-2xl bg-green-50 border-b-0 border-x border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                <h2 className="font-bold text-text-primary">Concluídos</h2>
              </div>
              <span className="bg-white text-text-primary text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {orders.filter(o => o.status === 'completed').length}
              </span>
            </div>
            <div 
              className="bg-gray-50/50 flex-1 border border-gray-200 rounded-b-2xl p-3 flex flex-col gap-3 overflow-y-auto min-h-[200px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'completed')}
            >
              {orders.filter(o => o.status === 'completed').map(order => (
                <div 
                  key={order.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, order.id)}
                  className="bg-white/80 p-3 rounded-xl border border-gray-100 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-500">{order.id}</span>
                    <span className="text-xs text-gray-400">{order.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
