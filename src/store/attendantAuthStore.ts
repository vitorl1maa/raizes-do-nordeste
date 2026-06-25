import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AttendantAuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAttendantAuthStore = create<AttendantAuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'raizes-attendant-auth',
    }
  )
);
