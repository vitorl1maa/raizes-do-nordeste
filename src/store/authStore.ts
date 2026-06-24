import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  usersCookiesAccepted: Record<string, boolean>;
  usersAvatars: Record<string, string>;
  isAvatarModalOpen: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
  acceptCookies: (email: string) => void;
  setAvatar: (avatar: string) => void;
  openAvatarModal: () => void;
  closeAvatarModal: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      usersCookiesAccepted: {},
      usersAvatars: {},
      isAvatarModalOpen: false,
      login: (name, email) => set((state) => ({ 
        isAuthenticated: true, 
        user: { name, email, avatar: state.usersAvatars[email] } 
      })),
      logout: () => set({ isAuthenticated: false, user: null }),
      acceptCookies: (email) => set((state) => ({
        usersCookiesAccepted: { ...state.usersCookiesAccepted, [email]: true }
      })),
      setAvatar: (avatar) => set((state) => {
        if (!state.user) return state;
        return {
          user: { ...state.user, avatar },
          usersAvatars: { ...state.usersAvatars, [state.user.email]: avatar },
          isAvatarModalOpen: false
        };
      }),
      openAvatarModal: () => set({ isAvatarModalOpen: true }),
      closeAvatarModal: () => set({ isAvatarModalOpen: false }),
    }),
    {
      name: 'raizes-auth-storage',
    }
  )
);
