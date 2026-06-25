import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  additionals?: { name: string; price: number }[];
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'completed';
  time: string;
  deliveryOption: 'delivery' | 'pickup';
  address?: any;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'time'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        return {
          orders: [
            {
              ...order,
              id: `#${Math.floor(1000 + Math.random() * 9000)}`,
              time: timeString
            },
            ...state.orders
          ]
        };
      }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(order => order.id === id ? { ...order, status } : order)
      })),
      clearOrders: () => set({ orders: [] })
    }),
    {
      name: 'raizes-orders-storage'
    }
  )
);
