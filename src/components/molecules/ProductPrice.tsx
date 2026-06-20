import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProductPriceProps {
  price: number;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price, quantity = 0, onAdd, onRemove }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-lg font-bold text-primary">{formattedPrice}</span>
      
      {quantity > 0 ? (
        <div className="flex items-center gap-3 bg-bg-base rounded-full p-1 border border-gray-100">
          <button 
            onClick={onRemove}
            className="flex items-center justify-center p-2 text-text-secondary hover:text-error hover:bg-orange-50 rounded-full transition-colors cursor-pointer"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold text-text-primary min-w-[20px] text-center">{quantity}</span>
          <button 
            onClick={onAdd}
            className="flex items-center justify-center p-2 text-primary hover:bg-orange-100 rounded-full transition-colors cursor-pointer"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>
      ) : (
        <button 
          onClick={onAdd}
          className="flex items-center cursor-pointer justify-center p-3 bg-bg-base text-primary rounded-full hover:bg-orange-100 transition-colors border border-transparent"
          aria-label="Adicionar ao carrinho"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};
