import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../atoms/Badge';
import { ProductPrice } from '../molecules/ProductPrice';

export interface ProductCardProps {
  id?: string | number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  badge?: string;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  imageUrl,
  badge,
  quantity,
  onAdd,
  onRemove
}) => {
  const detailLink = id != null ? `/produto/${id}` : '#';

  return (
    <article className="flex flex-col gap-4 p-4 bg-bg-surface rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <Link to={detailLink} className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 block group">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary">{badge}</Badge>
          </div>
        )}
      </Link>
      
      <div className="flex flex-col gap-2 flex-grow">
        <Link to={detailLink} className="hover:text-primary transition-colors">
          <h3 className="text-lg font-bold text-text-primary leading-tight">{title}</h3>
        </Link>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <ProductPrice price={price} quantity={quantity} onAdd={onAdd} onRemove={onRemove} />
    </article>
  );
};
