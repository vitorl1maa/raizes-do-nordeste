import React from 'react';
import { ProductCard, type ProductCardProps } from './ProductCard';

interface ProductGridProps {
  products: (ProductCardProps & { id: string | number })[];
  onAddProduct?: (id: string | number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          {...product} 
          onAdd={() => onAddProduct?.(product.id)}
        />
      ))}
    </div>
  );
};
