import React from 'react';
import { User, ShoppingBag, Utensils, Tag, MapPin } from 'lucide-react';
import logo from "../../assets/images/logo-pequeno.png"
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartTotal?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated, user } = useAuthStore();
  const getCartTotal = useCartStore(state => state.getCartTotal);
  const orders = useOrderStore(state => state.orders);
  const location = useLocation();

  const activeOrdersCount = orders.filter(o => o.customer === user?.name && o.status !== 'completed').length;

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(getCartTotal());

  return (
    <header className="flex items-center justify-between px-5 py-4 bg-bg-surface shadow-sm fixed top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-16" />
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-8">
      <nav className="flex items-center gap-1 md:gap-2">
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
          <span className={`max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2 group-hover:pr-2 transition-all duration-300 ${
            location.pathname === '/promocoes' ? 'font-semibold' : 'font-medium'
          }`}>
            Promoções e Cupons
          </span>
        </Link>

        {/* Link Acompanhamento que expande */}
        <Link 
          to="/acompanhamento" 
          className={`group flex items-center bg-bg-surface border border-transparent hover:border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all duration-300 ease-in-out ${
            location.pathname === '/acompanhamento' ? 'text-primary' : 'text-text-secondary hover:text-primary'
          }`}
          aria-label="Acompanhar Pedido"
        >
          <div className="relative flex items-center justify-center">
            <MapPin size={22} className="shrink-0" />
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 animate-pulse border-2 border-white shadow-sm">
                {activeOrdersCount}
              </span>
            )}
          </div>
          <span className={`max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:ml-2 group-hover:pr-2 transition-all duration-300 ${
            location.pathname === '/acompanhamento' ? 'font-semibold' : 'font-medium'
          }`}>
            Acompanhar Pedidos
          </span>
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:mr-2">
            <Link to="/perfil" className="flex items-center gap-2 hover:bg-gray-50 rounded-full md:pr-3 transition-colors cursor-pointer" aria-label="Acessar Perfil">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 object-cover bg-white" />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white text-text-primary">
                  <></>
                </div>
              )}
              <span className="text-text-primary font-bold text-lg hidden md:inline-block">Olá, {user?.name.split(' ')[0]}</span>
            </Link>
          </div>
        ) : (
          <Link to="/login" className="p-2 text-text-primary hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center" aria-label="Perfil">
            <></>
          </Link>
        )}
        <Link to="/checkout" className="hidden md:flex items-center gap-2 px-4 py-2 bg-bg-surface border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer" aria-label="Carrinho">
          <ShoppingBag className="text-primary" size={20} />
          <span className="font-bold text-text-primary">{formattedTotal}</span>
        </Link>
      </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-4 z-40">
        <Link to="/checkout" className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-full shadow-[0_8px_24px_rgba(249,115,22,0.4)] hover:bg-orange-600 transition-all cursor-pointer">
          <ShoppingBag size={22} />
          <span className="font-bold">{formattedTotal}</span>
        </Link>
      </div>
    </header>
  );
};
