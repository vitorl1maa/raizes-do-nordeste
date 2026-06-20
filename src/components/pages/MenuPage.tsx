import React, { useState } from 'react';
import { Header } from '../organisms/Header';
import { SearchInput } from '../molecules/SearchInput';
import { ProductGrid } from '../organisms/ProductGrid';
import { CartSummary } from '../organisms/CartSummary';
import { SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS, MOCK_CART_ITEMS } from '../../mocks';

export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  
  // Fake cart state just for UI demonstration
  const cartItems = MOCK_CART_ITEMS;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col text-left">
      <Header cartTotal={30.90} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-10 py-10 flex flex-col lg:flex-row gap-16">
        {/* Left Column - Menu */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-4xl font-bold text-text-primary m-0">Nosso Cardápio</h1>
            
            <div className="flex gap-4 items-center w-full md:w-auto">
              <SearchInput className="flex-1 md:w-72" />
              <button className="p-3.5 bg-bg-surface border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="text-text-primary" size={20} />
              </button>
            </div>
          </div>

          {/* Categories Tab */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors border border-gray-200 ${
                  activeCategory === category
                    ? 'bg-primary text-bg-surface border-primary'
                    : 'bg-bg-surface text-text-secondary hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <ProductGrid products={MOCK_PRODUCTS} onAddProduct={(id) => console.log('Added', id)} />
        </div>

        {/* Right Column - Cart Summary */}
        <div className="hidden lg:block w-[360px]">
          <CartSummary items={cartItems} />
        </div>
      </main>
    </div>
  );
};
