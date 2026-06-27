import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { PRODUCT_DETAILS } from '../../mocks';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useProductStore } from '../../store/productStore';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Clock, 
  Weight, 
  Users,
  AlertTriangle,
  Flame,
  ChevronRight,
  Check,
  CreditCard,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items: cartItems, addItem, updateQuantity } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { products } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState<number[]>([]);
  const [observation, setObservation] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const product = useMemo(() => {
    const numId = Number(id);
    return products.find(p => p.id === numId);
  }, [id, products]);

  const details = useMemo(() => {
    const numId = Number(id);
    return PRODUCT_DETAILS[numId] || {
      id: numId,
      weight: "250g",
      calories: "320 kcal",
      prepTime: "15 min",
      servings: "1 pessoa",
      additionals: [
        { id: 1, name: "Queijo Coalho Extra", price: 4.50 },
        { id: 2, name: "Carne de Sol Extra", price: 8.00 },
        { id: 3, name: "Manteiga de Garrafa", price: 1.50 }
      ],
      ingredients: ["Goma de mandioca hidratada", "Carne de sol desfiada", "Queijo coalho ralado", "Manteiga"],
      nutritionalInfo: {
        carb: "45g",
        protein: "18g",
        fat: "12g",
        sodium: "220mg"
      }
    };
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
            <p className="text-xl text-text-secondary">Produto não encontrado.</p>
            <Button onClick={() => navigate('/cardapio')}>Voltar ao Cardápio</Button>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const toggleAdditional = (additionalId: number) => {
    setSelectedAdditionals(prev =>
      prev.includes(additionalId)
        ? prev.filter(id => id !== additionalId)
        : [...prev, additionalId]
    );
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const additionalsTotal = details?.additionals
    .filter(a => selectedAdditionals.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0) ?? 0;

  const unitPrice = product.price + additionalsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    // Generate a unique ID for the cart item based on product and selected additionals
    const cartItemId = selectedAdditionals.length > 0 
      ? `${product.id}-${[...selectedAdditionals].sort().join('-')}` 
      : product.id;

    const cartItem = cartItems.find(item => item.id === cartItemId);
    const additionalsData = details?.additionals
      .filter(a => selectedAdditionals.includes(a.id))
      .map(a => ({ name: a.name, price: a.price })) || [];
    
    if (cartItem) {
      updateQuantity(cartItemId, cartItem.quantity + quantity);
    } else {
      addItem({ 
        id: cartItemId, 
        name: product.title, 
        price: unitPrice,
        additionals: additionalsData.length > 0 ? additionalsData : undefined
      });
      if (quantity > 1) {
        updateQuantity(cartItemId, quantity);
      }
    }
    
    showToast('Produto adicionado ao carrinho!');
    
    // Reset state after adding
    setQuantity(1);
    setSelectedAdditionals([]);
    setObservation('');
  };

  const handleBuyNow = () => {
    // Generate a unique ID for the cart item based on product and selected additionals
    const cartItemId = selectedAdditionals.length > 0 
      ? `${product.id}-${[...selectedAdditionals].sort().join('-')}` 
      : product.id;

    const cartItem = cartItems.find(item => item.id === cartItemId);
    const additionalsData = details?.additionals
      .filter(a => selectedAdditionals.includes(a.id))
      .map(a => ({ name: a.name, price: a.price })) || [];
    
    if (cartItem) {
      updateQuantity(cartItemId, cartItem.quantity + quantity);
    } else {
      addItem({ 
        id: cartItemId, 
        name: product.title, 
        price: unitPrice,
        additionals: additionalsData.length > 0 ? additionalsData : undefined
      });
      if (quantity > 1) {
        updateQuantity(cartItemId, quantity);
      }
    }
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  // Find related products from same category
  const relatedProducts = products
    .filter(p => p.active !== false && p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col text-left">
      <Header />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-10 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link to="/cardapio" className="hover:text-primary transition-colors">Cardápio</Link>
          <ChevronRight size={14} />
          <span className="text-text-secondary">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-text-primary font-medium">{product.title}</span>
        </nav>

        {/* Back button (mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar</span>
        </button>

        {/* Product Main Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3] shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {(product as any).badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{(product as any).badge}</Badge>
                </div>
              )}
            </div>

            {/* Tabs: Ingredients / Nutritional Info / Allergens */}
            {details && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ingredients */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-bold text-text-primary text-lg mb-4">Ingredientes</h3>
                  <ul className="flex flex-col gap-2">
                    {details.ingredients.map((ingredient, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary">
                        <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutritional Info */}
                {details.nutritionalInfo && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                      <Flame size={20} className="text-primary" />
                      Informação Nutricional
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {details.nutritionalInfo.calories && (
                        <div className="bg-orange-50 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-primary">{details.nutritionalInfo.calories.replace(' kcal', '')}</p>
                          <p className="text-xs text-text-secondary mt-1">kcal</p>
                        </div>
                      )}
                      {details.nutritionalInfo.protein && (
                        <div className="bg-blue-50 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600">{details.nutritionalInfo.protein}</p>
                          <p className="text-xs text-text-secondary mt-1">Proteínas</p>
                        </div>
                      )}
                      {details.nutritionalInfo.carbs && (
                        <div className="bg-yellow-50 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-yellow-600">{details.nutritionalInfo.carbs}</p>
                          <p className="text-xs text-text-secondary mt-1">Carboidratos</p>
                        </div>
                      )}
                      {details.nutritionalInfo.fat && (
                        <div className="bg-purple-50 rounded-xl p-3 text-center">
                          <p className="text-2xl font-bold text-purple-600">{details.nutritionalInfo.fat}</p>
                          <p className="text-xs text-text-secondary mt-1">Gorduras</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Allergens */}
                {details.allergens && details.allergens.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:col-span-2">
                    <h3 className="font-bold text-text-primary text-lg mb-4 flex items-center gap-2">
                      <AlertTriangle size={20} className="text-yellow-500" />
                      Alérgenos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.allergens.map((allergen, i) => (
                        <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-200">
                          {allergen}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-text-secondary mt-4 leading-relaxed">
                      Este produto pode conter traços dos alérgenos listados acima. Se você possui alguma alergia alimentar, consulte nosso atendente.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Category & Title */}
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">{product.title}</h1>
              <p className="text-text-secondary mt-3 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Info Pills */}
            {details && (
              <div className="flex flex-wrap gap-3">
                {details.weight && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl">
                    <Weight size={18} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">{details.weight}</span>
                  </div>
                )}
                {details.servings && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl">
                    <Users size={18} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">{details.servings}</span>
                  </div>
                )}
                {details.prepTime && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl">
                    <Clock size={18} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">{details.prepTime}</span>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">{formatCurrency(product.price)}</span>
            </div>

            {/* Additionals */}
            {details && details.additionals.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h3 className="font-bold text-text-primary text-lg mb-4">Adicionais</h3>
                <div className="flex flex-col gap-3">
                  {details.additionals.map(additional => (
                    <label
                      key={additional.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedAdditionals.includes(additional.id)
                          ? 'border-primary bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedAdditionals.includes(additional.id)}
                        onChange={() => toggleAdditional(additional.id)}
                      />
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedAdditionals.includes(additional.id)
                            ? 'bg-primary border-primary'
                            : 'border-gray-300'
                        }`}>
                          {selectedAdditionals.includes(additional.id) && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-text-primary font-medium">{additional.name}</span>
                      </div>
                      <span className={`font-semibold ${additional.price === 0 ? 'text-success' : 'text-text-primary'}`}>
                        {additional.price === 0 ? 'Grátis' : `+ ${formatCurrency(additional.price)}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Observation */}
            <div className="flex flex-col gap-2">
              <label htmlFor="observation" className="font-bold text-text-primary text-lg">
                Observações
              </label>
              <textarea
                id="observation"
                rows={3}
                placeholder="Ex: Tirar cebola, ponto da carne, etc..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-2">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 self-start">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Minus size={18} className="text-text-primary" />
                </button>
                <span className="w-10 text-center text-lg font-bold text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus size={18} className="text-text-primary" />
                </button>
              </div>
              <div className="flex-1 flex flex-col  gap-2">
                <Button
                  size="lg"
                  className="flex-1 gap-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={20} />
                  Adicionar {formatCurrency(totalPrice)}
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  className="flex-1 gap-3"
                  onClick={handleBuyNow}
                >
                  <CreditCard size={20} />
                  Finalizar Pedido
                </Button>
              </div>
            </div>
          </div>
        </div>



        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Você também pode gostar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rp => (
                <Link
                  key={rp.id}
                  to={`/produto/${rp.id}`}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow group"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center gap-1 min-w-0">
                    <h3 className="font-bold text-text-primary truncate">{rp.title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2">{rp.description}</p>
                    <span className="text-primary font-bold mt-1">{formatCurrency(rp.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Toast Notificação */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-transform animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 min-w-[300px]">
            <Check className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-slate-800 font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
