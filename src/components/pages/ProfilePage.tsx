import React, { useState } from 'react';
import { Header } from '../organisms/Header';
import { useAuthStore } from '../../store/authStore';
import { User, Shield, Lock, Save, ShoppingBag, History, Star, Download, Trash2, Eye, EyeOff, LogOut, Pencil, Check } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export function ProfilePage() {
  const { user, isAuthenticated, logout, openAvatarModal } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dados');
  
  // States for form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('(81) 99999-9999');
  
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').substring(0, 11);
    if (digits.length === 0) {
      setPhone('');
      return;
    }
    if (digits.length <= 2) {
      setPhone(`(${digits}`);
      return;
    }
    if (digits.length <= 7) {
      setPhone(`(${digits.substring(0, 2)}) ${digits.substring(2)}`);
      return;
    }
    setPhone(`(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`);
  };
  
  // State for promotions toggle
  const [receivePromotions, setReceivePromotions] = useState(true);
  
  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Dados salvos com sucesso!');
  };

  return (
    <div className="min-h-screen bg-bg-main flex flex-col pt-28">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col items-center relative">
                <div className="relative group cursor-pointer" onClick={openAvatarModal}>
                  <div className="w-24 h-24 rounded-full border-4 border-orange-100 mb-4 overflow-hidden bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-105">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-gray-400" />
                    )}
                  </div>
                  <div className="absolute bottom-4 right-0 bg-orange-500 text-white p-2 rounded-full shadow-lg border-2 border-white group-hover:bg-orange-600 transition-colors">
                    <Pencil size={16} />
                  </div>
                </div>
                <h2 className="font-bold text-lg text-slate-800 text-center">{user?.name}</h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
              <nav className="p-2">
                <button 
                  onClick={() => setActiveTab('dados')}
                  className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dados' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}`}
                >
                  <User size={20} />
                  Dados Pessoais
                </button>
                <button 
                  onClick={() => setActiveTab('privacidade')}
                  className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'privacidade' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}`}
                >
                  <Shield size={20} />
                  Privacidade
                </button>
                <button 
                  onClick={() => setActiveTab('seguranca')}
                  className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'seguranca' ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}`}
                >
                  <Lock size={20} />
                  Segurança
                </button>
              </nav>
              <div className="p-2 border-t border-gray-100 mt-2">
                <button 
                  onClick={logout}
                  className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-colors text-red-500 hover:bg-red-50 hover:text-red-600 font-medium"
                >
                  <LogOut size={20} />
                  Sair da Conta
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {activeTab === 'dados' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="text-orange-500" />
                  Dados Pessoais
                </h2>
                
                <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                  <div className="space-y-4">
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Celular</label>
                      <input 
                        type="text" 
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors cursor-pointer">
                      <Save size={20} />
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'privacidade' && (
              <div className="animate-in fade-in duration-300 max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Shield className="text-orange-500" />
                  Privacidade e Dados
                </h2>
                
                <div className="bg-[#fef9f5] rounded-3xl p-6 md:p-8 mb-6">
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="bg-orange-50 p-3 rounded-xl h-fit text-orange-500">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">Identificação de Pedidos</h3>
                        <p className="text-slate-600">
                          Seu nome e telefone são usados exclusivamente para que possamos
                          preparar e entregar o pedido certo na unidade escolhida.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 flex-col md:flex-row ">
                      <div className="bg-orange-50 p-3 rounded-xl h-fit text-orange-500">
                        <History size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">Histórico de Compras</h3>
                        <p className="text-slate-600">
                          Mantemos o registro do que você já pediu para facilitar futuros pedidos e
                          resolver qualquer problema no atendimento.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 flex-col md:flex-row ">
                      <div className="bg-orange-50 p-3 rounded-xl h-fit text-orange-500">
                        <Star size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">Pontuação no Clube Raízes</h3>
                        <p className="text-slate-600">
                          Seus dados vinculam os pontos ao seu CPF/Email, garantindo que você
                          ganhe recompensas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 mb-8">
                  <h3 className="font-bold text-slate-800 text-xl mb-6">Comunicação de Promoções</h3>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Receber ofertas e novidades</h4>
                      <p className="text-slate-500 text-sm">Via e-mail e SMS.</p>
                    </div>
                    
                    {/* Toggle Switch */}
                    <button 
                      type="button"
                      onClick={() => setReceivePromotions(!receivePromotions)}
                      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${receivePromotions ? 'bg-green-600' : 'bg-gray-300'}`}
                      role="switch"
                      aria-checked={receivePromotions}
                    >
                      <span className="sr-only">Receber ofertas</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${receivePromotions ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="flex items-center gap-2 font-semibold text-red-500 hover:text-red-600 transition-colors w-full sm:w-auto justify-center cursor-pointer"
                  >
                    <Trash2 size={20} />
                    Solicitar exclusão da conta
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'seguranca' && (
              <div className="animate-in fade-in duration-300 max-w-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Lock className="text-orange-500" />
                  Segurança e Senha
                </h2>
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Nova Senha</label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="Nova senha (mínimo 6 caracteres)"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all pr-12"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nova Senha</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Digite a nova senha novamente"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all pr-12"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors cursor-pointer">
                      <Save size={20} />
                      Atualizar Senha
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <div className="bg-red-50 p-4 rounded-full text-red-500">
                <Trash2 size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">
              Solicitar exclusão
            </h3>
            <p className="text-center text-slate-600 mb-6 text-sm">
              Tem certeza que deseja excluir sua conta? Após a confirmação, sua conta e todos os dados associados a ela serão <strong>excluídos permanentemente em até 24 horas</strong>.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  showToast("Solicitação enviada com sucesso!");
                  setIsDeleteModalOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Sim, quero excluir
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notificação */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-transform animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 min-w-[300px]">
            <Check className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-slate-800 font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
