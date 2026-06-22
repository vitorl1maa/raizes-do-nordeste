import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { SearchInput } from '../molecules/SearchInput';
import { ProductGrid } from '../organisms/ProductGrid';
import { CartSummary } from '../organisms/CartSummary';
import { SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from '../../mocks';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Hooks
  const navigate = useNavigate();
  const { items: cartItems, addItem, updateQuantity, getCartTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  // Select the appropriate array directly from the MOCK_PRODUCTS object
  const currentCategoryProducts = (MOCK_PRODUCTS as Record<string, any[]>)[activeCategory] || MOCK_PRODUCTS["Todos"];

  const filteredProducts = currentCategoryProducts.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.description.toLowerCase().includes(searchQuery.toLowerCase());
  }).map(product => {
    // Inject current quantity from cart into the product
    const cartItem = cartItems.find(item => item.id === product.id);
    return { ...product, quantity: cartItem ? cartItem.quantity : 0 };
  });

  const handleAddProduct = (id: string | number) => {
    // Find product from all products (Todos)
    const product = MOCK_PRODUCTS["Todos"].find(p => p.id === id);
    if (product) {
      addItem({
        id: product.id as string | number,
        name: product.title,
        price: product.price
      });
    }
  };

  const handleRemoveProduct = (id: string | number) => {
    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      updateQuantity(id, cartItem.quantity - 1);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Not logged in, redirect to login
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col text-left">
      <Header cartTotal={getCartTotal()} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-10 pt-28 pb-10 flex flex-col lg:flex-row gap-16">
        {/* Left Column - Menu */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-4xl font-bold text-text-primary m-0">Nosso Cardápio</h1>
            
            <div className="flex gap-4 items-center w-full md:w-auto">
              <SearchInput 
                className="flex-1 md:w-72" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                className={`px-6 py-2 cursor-pointer rounded-full font-semibold whitespace-nowrap transition-colors border border-gray-200 ${
                  activeCategory === category
                    ? 'bg-primary text-bg-surface border-primary'
                    : 'bg-bg-surface text-text-secondary hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-text-secondary text-lg">Nenhum produto encontrado com "{searchQuery}".</p>
            </div>
          ) : (
            <ProductGrid 
              products={filteredProducts} 
              onAddProduct={handleAddProduct} 
              onRemoveProduct={handleRemoveProduct} 
            />
          )}
        </div>

        {/* Right Column - Cart Summary */}
        <div className="hidden lg:block w-[360px]">
          <CartSummary items={cartItems} onCheckout={handleCheckout} />
        </div>
      </main>
    </div>
  );
};
