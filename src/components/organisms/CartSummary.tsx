import React from 'react';
import { Button } from '../atoms/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const formatPrice = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <aside className="flex flex-col gap-6 bg-bg-surface p-6 rounded-[32px] shadow-sm border border-gray-100 min-w-[360px] h-fit">
      <h2 className="text-xl font-bold text-text-primary m-0">Resumo do Pedido</h2>
      
      {items.length === 0 ? (
        <p className="text-text-secondary text-sm">Seu carrinho está vazio.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-start">
              <span className="text-text-secondary text-sm">
                {item.quantity}x {item.name}
              </span>
              <span className="text-text-primary font-semibold text-sm">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <span className="text-text-primary font-bold">Total</span>
        <span className="text-primary font-bold text-xl">{formatPrice(subtotal)}</span>
      </div>

      <Button fullWidth onClick={onCheckout} disabled={items.length === 0}>
        Finalizar Pedido
      </Button>
    </aside>
  );
};
