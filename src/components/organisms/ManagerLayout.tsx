import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useManagerAuthStore } from '../../store/managerAuthStore';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import logo from '../../assets/images/logo-pequeno.png';
import { 
  Sun, 
  LayoutDashboard, 
  UtensilsCrossed, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut, 
  User, 
  Building2 
} from 'lucide-react';

interface ManagerLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children, title }) => {
  const { isLoggedIn, login, logout } = useManagerAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'gerencia' && password === 'gen@2026') {
      login();
      setError('');
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/gerente/dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[32px] shadow-lg border border-orange-100 w-full max-w-md flex flex-col gap-8 transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Sun className="text-primary w-10 h-10" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-text-primary">Acesso da Equipe</h1>
              <p className="text-sm text-text-secondary mt-1">Gestão Administrativa • Raízes do Nordeste</p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-error rounded-2xl text-sm font-semibold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              label="Usuário"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite o usuário"
            />
            <Input
              label="Senha"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
            <Button type="submit" fullWidth className="mt-2 py-4 rounded-2xl text-base font-bold shadow-md hover:shadow-lg transition-all">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const menuItems = [
    { 
      path: '/gerente/dashboard', 
      label: 'Visão Geral', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      path: '/gerente/cardapio', 
      label: 'Gestão de Cardápio', 
      icon: <UtensilsCrossed size={20} /> 
    },
    { 
      path: '#clientes', 
      label: 'Clientes', 
      icon: <Users size={20} />,
      disabled: true 
    },
    { 
      path: '#configuracoes', 
      label: 'Configurações', 
      icon: <Settings size={20} />,
      disabled: true 
    },
    { 
      path: '#suporte', 
      label: 'Suporte', 
      icon: <HelpCircle size={20} />,
      disabled: true 
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex text-left">
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0 shadow-sm">
        <div className="flex flex-col gap-10">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2">
            <Sun className="text-primary w-8 h-8" />
            <span className="font-black text-xl text-text-primary tracking-tight">Raízes Admin</span>
          </div>

          {/* Nav Menu */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={idx}
                  onClick={() => !item.disabled && navigate(item.path)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    item.disabled 
                      ? 'text-gray-300 cursor-not-allowed opacity-50' 
                      : isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-[#FFF7F0] p-4 rounded-2xl border border-orange-50/50">
            <div className="w-10 h-10 bg-text-primary rounded-xl flex items-center justify-center text-white font-bold">
              G
            </div>
            <div>
              <p className="font-bold text-sm text-text-primary">Gerente Geral</p>
              <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                <Building2 size={12} /> Boa Viagem
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-text-secondary hover:text-error hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut size={20} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-10 py-5 flex justify-between items-center shadow-sm">
          <h2 className="text-2xl font-black text-text-primary tracking-tight">{title}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold bg-[#FFF7F0] text-primary px-4 py-2 rounded-full border border-orange-100 flex items-center gap-2">
              <Building2 size={16} /> Unidade Boa Viagem
            </span>
            <span className="text-sm text-text-secondary font-medium">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>
    </div>
  );
};
