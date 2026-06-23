import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  activeCoupon: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      activeCoupon: null,
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter(item => item.id !== id) };
        }
        return {
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        };
      }),
      clearCart: () => set({ items: [], activeCoupon: null }),
      applyCoupon: (code) => {
        if (!code) return false;
        const upperCode = code.toUpperCase().trim();
        const validCoupons = ['RAIZES20', 'RAIZES10', 'BEMVINDO10', 'FRETE0'];
        if (validCoupons.includes(upperCode)) {
          set({ activeCoupon: upperCode });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ activeCoupon: null }),
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'raizes-cart-storage', // Nome da chave que será salva no localStorage
    }
  )
);
