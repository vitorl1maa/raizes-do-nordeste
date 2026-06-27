import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookiesDrawer() {
  const { isAuthenticated, user, usersCookiesAccepted, acceptCookies } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsVisible(false);
      return;
    }

    // Check if the specific user has already accepted the policy in Zustand
    const hasAccepted = usersCookiesAccepted[user.email];
    
    // Only show if the user is authenticated and hasn't accepted yet
    if (!hasAccepted) {
      // Small delay to ensure smooth transition after login
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isAuthenticated, user, usersCookiesAccepted]);

  const handleAccept = () => {
    if (user) {
      acceptCookies(user.email);
    }
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-orange-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-in-out translate-y-0">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Cookie size={24} />
            Sua Privacidade
          </h3>
          <p className="text-sm text-slate-600">
            Nós utilizamos <strong>cookies essenciais</strong> para garantir o funcionamento correto e seguro da nossa plataforma, 
            como manter sua sessão ativa e salvar suas preferências locais. Por serem estritamente necessários, eles não podem ser desativados. 
            Para mais detalhes, consulte nossa <Link to="/perfil" state={{ tab: 'privacidade' }} onClick={handleClose} className="text-orange-500 hover:underline">Política de Privacidade</Link>.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
