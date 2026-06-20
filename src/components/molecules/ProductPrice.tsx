import React from 'react';
import { Plus } from 'lucide-react';

interface ProductPriceProps {
  price: number;
  onAdd?: () => void;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ price, onAdd }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);

  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-lg font-bold text-primary">{formattedPrice}</span>
      <button 
        onClick={onAdd}
        className="flex items-center justify-center p-3 bg-bg-base text-primary rounded-full hover:bg-orange-100 transition-colors"
        aria-label="Adicionar ao carrinho"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};
