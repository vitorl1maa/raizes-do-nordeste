import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ManagerAuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useManagerAuthStore = create<ManagerAuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'raizes-manager-auth',
    }
  )
);
