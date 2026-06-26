import React from 'react';
import { Button } from '../atoms/Button';
import { Trash2 } from 'lucide-react';

import type { CartItem } from '../../store/cartStore';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout?: () => void;
  onRemoveItem?: (id: string | number) => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout, onRemoveItem }) => {
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
            <div key={item.id} className="flex justify-between items-start gap-3">
              <div className="flex flex-col flex-1">
                <span className="text-text-secondary text-sm font-medium">
                  {item.quantity}x {item.name}
                </span>
                {item.additionals && item.additionals.length > 0 && (
                  <div className="flex flex-col mt-1 mb-1 pl-2 border-l-2 border-gray-100">
                    {item.additionals.map((add, idx) => (
                      <span key={idx} className="text-xs text-gray-500 leading-snug">
                        + {add.name} <span className="text-gray-400">({formatPrice(add.price)})</span>
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-text-primary font-semibold text-sm mt-1">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
              {onRemoveItem && (
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              )}
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
