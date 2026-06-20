import React from 'react';
import { Badge } from '../atoms/Badge';
import { ProductPrice } from '../molecules/ProductPrice';

export interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  badge?: string;
  onAdd?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  badge,
  onAdd
}) => {
  return (
    <article className="flex flex-col gap-4 p-4 bg-bg-surface rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary">{badge}</Badge>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="text-lg font-bold text-text-primary leading-tight">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <ProductPrice price={price} onAdd={onAdd} />
    </article>
  );
};
