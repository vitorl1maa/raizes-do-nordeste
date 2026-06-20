import React from 'react';
import { User, ShoppingBag, LogOut } from 'lucide-react';
import logo from "../../assets/images/logo-pequeno.png"
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  cartTotal?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartTotal = 0 }) => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal);

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-bg-surface shadow-sm fixed top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-16" />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-primary font-semibold">Cardápio</a>
        <a href="#" className="text-text-secondary font-medium hover:text-primary transition-colors">Promoções</a>
        <a href="#" className="text-text-secondary font-medium hover:text-primary transition-colors">Fidelidade</a>
      </nav>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 mr-2">
            <span className="text-text-primary font-bold text-lg hidden md:inline-block">Olá, {user?.name.split(' ')[0]}</span>
            <button onClick={logout} className="p-2 text-text-secondary hover:text-error hover:bg-red-50 rounded-full transition-colors cursor-pointer" aria-label="Sair">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button className="p-2 text-text-primary hover:bg-gray-100 rounded-full transition-colors" aria-label="Perfil">
            <User size={24} />
          </button>
        )}
        <button className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-gray-200 rounded-full hover:bg-gray-50 transition-colors" aria-label="Carrinho">
          <ShoppingBag className="text-primary" size={20} />
          <span className="font-bold text-text-primary">{formattedTotal}</span>
        </button>
      </div>
    </header>
  );
};
