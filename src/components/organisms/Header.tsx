import React from 'react';
import { User, ShoppingBag, LogOut, Utensils, Tag } from 'lucide-react';
import logo from "../../assets/images/logo-pequeno.png"
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartTotal?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getCartTotal } = useCartStore();
  const location = useLocation();

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(getCartTotal());

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-bg-surface shadow-sm fixed top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-16" />
        </Link>
      </div>

      <div className="flex items-center gap-8">
      <nav className="hidden md:flex items-center gap-2">
        {/* Link Cardápio que expande */}
        <Link 
          to="/cardapio" 
          className={`group flex items-center bg-bg-surface border border-transparent hover:border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all duration-300 ease-in-out ${
            location.pathname === '/cardapio' || location.pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-primary'
          }`}
          aria-label="Cardápio"
        >
          <Utensils size={22} className="shrink-0" />
          <span className={`max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 group-hover:pr-2 transition-all duration-300 ${
            location.pathname === '/cardapio' || location.pathname === '/' ? 'font-semibold' : 'font-medium'
          }`}>
            Cardápio
          </span>
        </Link>
        
        {/* Link Promoções que expande */}
        <Link 
          to="/promocoes" 
          className={`group flex items-center bg-bg-surface border border-transparent hover:border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all duration-300 ease-in-out ${
            location.pathname === '/promocoes' ? 'text-primary' : 'text-text-secondary hover:text-primary'
          }`}
          aria-label="Promoções"
        >
          <Tag size={22} className="shrink-0" />
          <span className={`max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-2 group-hover:pr-2 transition-all duration-300 ${
            location.pathname === '/promocoes' ? 'font-semibold' : 'font-medium'
          }`}>
            Promoções
          </span>
        </Link>
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
        <span className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-gray-200 rounded-full hover:bg-gray-50 transition-colors" aria-label="Carrinho">
          <ShoppingBag className="text-primary" size={20} />
          <span className="font-bold text-text-primary">{formattedTotal}</span>
        </span>
      </div>
      </div>
    </header>
  );
};
