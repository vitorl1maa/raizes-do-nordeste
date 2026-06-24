import React from 'react';
import { useAuthStore } from '../../store/authStore';

// We import all avatars from the folder
import avatar1 from '../../assets/images/avatares/Open Peeps - Avatar.png';
import avatar2 from '../../assets/images/avatares/Open Peeps - Avatar (1).png';
import avatar3 from '../../assets/images/avatares/Open Peeps - Avatar (2).png';
import avatar4 from '../../assets/images/avatares/Open Peeps - Avatar (3).png';
import avatar5 from '../../assets/images/avatares/avatar-feminino.png';
import avatar6 from '../../assets/images/avatares/avatar-masculino.png';

const AVATARS = [
  { id: '1', src: avatar1, alt: 'Avatar 1' },
  { id: '2', src: avatar2, alt: 'Avatar 2' },
  { id: '3', src: avatar3, alt: 'Avatar 3' },
  { id: '4', src: avatar4, alt: 'Avatar 4' },
  { id: '5', src: avatar5, alt: 'Avatar 5' },
  { id: '6', src: avatar6, alt: 'Avatar 6' },
];

import { X } from 'lucide-react';

export function AvatarModal() {
  const { isAuthenticated, user, setAvatar, isAvatarModalOpen, closeAvatarModal } = useAuthStore();

  // Show if: authenticated AND (doesn't have an avatar OR isAvatarModalOpen is true)
  if (!isAuthenticated || !user) return null;
  const needsAvatar = !user.avatar;
  const shouldShow = needsAvatar || isAvatarModalOpen;

  if (!shouldShow) return null;

  const handleSelectAvatar = (src: string) => {
    setAvatar(src);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 relative">
        {!needsAvatar && (
          <button 
            onClick={closeAvatarModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        )}
        
        <div className="text-center mb-6 mt-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Escolha seu Avatar</h2>
          <p className="text-slate-600 text-sm">
            {needsAvatar ? "Como é o seu primeiro acesso, escolha um avatar que mais combina com você!" : "Selecione a imagem que mais combina com você."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => handleSelectAvatar(avatar.src)}
              className={`group flex items-center justify-center p-2 rounded-xl border-2 hover:border-orange-500 transition-all cursor-pointer overflow-hidden aspect-square ${user.avatar === avatar.src ? 'border-orange-500 bg-orange-50' : 'border-transparent bg-slate-50 hover:bg-orange-50'}`}
            >
              <img 
                src={avatar.src} 
                alt={avatar.alt} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
