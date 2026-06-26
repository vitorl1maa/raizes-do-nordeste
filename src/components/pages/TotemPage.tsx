import React, { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useProductStore } from '../../store/productStore';
import { 
  Sun, 
  Pointer, 
  Tag, 
  Utensils, 
  Flame, 
  CupSoda, 
  Cake, 
  Plus, 
  Minus, 
  Check, 
  Loader2, 
  QrCode, 
  Trash2,
  ArrowLeft
} from 'lucide-react';

type TotemStep = 'inicio' | 'cardapio' | 'pagamento' | 'senha';
type TotemCategory = 'Promoções' | 'Tapiocas' | 'Cuscuz' | 'Bebidas' | 'Sobremesas';

export const TotemPage: React.FC = () => {
  const [step, setStep] = useState<TotemStep>('inicio');
  const [activeCategory, setActiveCategory] = useState<TotemCategory>('Tapiocas');
  const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'approved'>('waiting');
  const [generatedSenha, setGeneratedSenha] = useState<string>('89');
  
  const { items: cartItems, addItem, removeItem, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const { addOrder } = useOrderStore();
  const { products } = useProductStore();

  // Reset cart when starting or resetting the totem
  useEffect(() => {
    if (step === 'inicio') {
      clearCart();
    }
  }, [step, clearCart]);

  // Auto-redirect to Início after 15 seconds on the final screen
  useEffect(() => {
    if (step === 'senha') {
      const timer = setTimeout(() => {
        setStep('inicio');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Simulate payment flow
  useEffect(() => {
    if (step === 'pagamento') {
      setPaymentStatus('waiting');
      const timer = setTimeout(() => {
        setPaymentStatus('approved');
        
        // Generate random ticket password (2 digits)
        const senha = Math.floor(10 + Math.random() * 90).toString();
        setGeneratedSenha(senha);

        // Submit order to kitchen (orderStore)
        addOrder({
          customer: `Totem #${senha}`,
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            additionals: item.additionals
          })),
          total: getCartTotal(),
          status: 'pending',
          deliveryOption: 'pickup'
        });

      }, 4000); // 4 seconds simulated time

      return () => clearTimeout(timer);
    }
  }, [step, cartItems, getCartTotal, addOrder]);

  // Handle final redirection from payment approval to ticket screen
  useEffect(() => {
    if (step === 'pagamento' && paymentStatus === 'approved') {
      const timer = setTimeout(() => {
        setStep('senha');
      }, 2000); // Show approved screen for 2s before password screen
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, step]);

  // Custom Totem Menu Products mapped to look extremely rich
  const totemProducts = useMemo(() => {
    const activeProducts = products.filter(p => p.active !== false);

    const defaultTapiocas = activeProducts.filter(p => p.category === 'Mais Pedidos' || p.title.toLowerCase().includes('tapioca'));
    const defaultCuscuz = activeProducts.filter(p => p.category === 'Mais Pedidos' && p.title.toLowerCase().includes('cuscuz'));

    return {
      "Promoções": activeProducts.filter(p => p.category === 'Combos'),
      "Tapiocas": defaultTapiocas.length > 0 ? defaultTapiocas : [
        { id: 201, title: "Tapioca de Carne de Sol", description: "Massa fininha com bastante queijo coalho e carne de sol desfiada.", price: 24.90, imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
        { id: 202, title: "Tapioca Marguerita", description: "Queijo coalho derretido na chapa, tomates maduros e manjericão fresco.", price: 19.90, imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" }
      ],
      "Cuscuz": defaultCuscuz.length > 0 ? defaultCuscuz : [
        { id: 301, title: "Cuscuz Completo", description: "Cuscuz quentinho no vapor com ovo caipira, queijo coalho grelhado e carne de sol charque.", price: 18.50, imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80" }
      ],
      "Bebidas": activeProducts.filter(p => p.category === 'Bebidas'),
      "Sobremesas": activeProducts.filter(p => p.category === 'Sobremesas')
    };
  }, [products]);

  const currentProducts = totemProducts[activeCategory] || [];

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getCategoryIcon = (cat: TotemCategory, active: boolean) => {
    const size = 32;
    const colorClass = active ? "text-white" : "text-[#6B625C]";
    switch(cat) {
      case 'Promoções': return <Tag size={size} className={colorClass} />;
      case 'Tapiocas': return <Utensils size={size} className={colorClass} />;
      case 'Cuscuz': return <Flame size={size} className={colorClass} />;
      case 'Bebidas': return <CupSoda size={size} className={colorClass} />;
      case 'Sobremesas': return <Cake size={size} className={colorClass} />;
    }
  };

  const handleAddProduct = (p: any) => {
    addItem({
      id: p.id,
      name: p.title,
      price: p.price
    });
  };

  if (step === 'inicio') {
    return (
      <div 
        onClick={() => setStep('cardapio')} 
        className="w-screen h-screen bg-[#FF4B16] flex flex-col items-center justify-center cursor-pointer select-none text-white overflow-hidden p-8 animate-fadeIn"
      >
        <div className="flex flex-col items-center justify-center gap-16 text-center max-w-4xl">
          {/* Logo Sun Icon */}
          <div className="relative p-8 bg-[#ff6333] rounded-full shadow-2xl animate-pulse">
            <Sun size={200} className="text-white drop-shadow-lg" />
          </div>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-8xl font-black tracking-tight drop-shadow-md">
              Raízes do Nordeste
            </h1>
            <p className="text-5xl font-semibold text-[#FFD447] tracking-wide">
              Autoatendimento
            </p>
          </div>

          <div className="h-12" />

          {/* Interactive touch action button */}
          <div 
            className="flex items-center gap-6 bg-white px-16 py-8 rounded-full shadow-[0_24px_64px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300 ease-out"
          >
            <Pointer size={64} className="text-[#FF4B16] animate-bounce" />
            <span className="text-4xl font-extrabold text-[#FF4B16]">
              TOQUE PARA INICIAR
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'pagamento') {
    return (
      <div className="w-screen h-screen bg-[#FFF7F0] flex items-center justify-center p-8 select-none">
        {paymentStatus === 'waiting' ? (
          <div className="bg-white rounded-[32px] p-16 shadow-[0_24px_48px_rgba(0,0,0,0.05)] border border-[#DDE3EA] flex flex-col items-center gap-10 max-w-2xl w-full text-center animate-scaleUp">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#FF4B16] tracking-wider uppercase">Autoatendimento</span>
              <h2 className="text-4xl font-black text-[#121212]">Aguardando Pagamento</h2>
            </div>
            
            {/* PIX QR Code Simulator */}
            <div className="p-8 bg-[#FFF7F0] rounded-3xl border border-[#DDE3EA] relative">
              <QrCode size={260} className="text-[#121212]" />
              <div className="absolute inset-0 bg-[#FFF7F0]/20 backdrop-blur-[1px] rounded-3xl flex items-center justify-center">
                <Loader2 size={64} className="text-[#FF4B16] animate-spin" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold text-[#121212]">Escaneie o QR Code acima</p>
              <p className="text-lg text-[#6B625C]">
                Abra o app do seu banco e pague via PIX para concluir o pedido.
              </p>
            </div>

            <div className="bg-[#FFF7F0] rounded-2xl p-6 w-full flex justify-between items-center border border-[#DDE3EA]">
              <span className="text-xl font-bold text-[#6B625C]">Valor a Pagar:</span>
              <span className="text-3xl font-black text-[#FF4B16]">{formatPrice(getCartTotal())}</span>
            </div>

            <button 
              onClick={() => setStep('cardapio')}
              className="text-lg font-semibold text-[#6B625C] hover:text-[#121212] flex items-center gap-2 cursor-pointer mt-2"
            >
              <ArrowLeft size={20} /> Voltar e alterar pedido
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] p-16 shadow-[0_24px_48px_rgba(0,0,0,0.05)] border border-[#DDE3EA] flex flex-col items-center gap-8 max-w-2xl w-full text-center animate-scaleUp">
            <div className="p-6 bg-[#0abb871a] rounded-full">
              <Check size={80} className="text-[#2E7D32] animate-bounce" />
            </div>
            
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl font-black text-[#121212]">Pagamento Aprovado!</h2>
              <p className="text-xl text-[#6B625C]">
                Processando seu ticket e enviando o pedido para a cozinha...
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (step === 'senha') {
    return (
      <div className="w-screen h-screen bg-white flex flex-col items-center justify-center p-8 select-none overflow-hidden animate-fadeIn">
        <div className="flex flex-col items-center justify-center gap-12 text-center max-w-3xl">
          <div className="p-8 bg-[#0abb871a] rounded-full">
            <Check size={100} className="text-[#2E7D32]" />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-black text-[#121212] tracking-tight">
              Pagamento Aprovado!
            </h1>
            <p className="text-2xl text-[#6B625C]">
              Seu pedido já foi para a cozinha. Acompanhe pelo painel de senhas.
            </p>
          </div>

          {/* Ticket Password Box */}
          <div 
            className="flex flex-col items-center bg-[#FFF7F0] border-4 border-[#FF4B16] rounded-[40px] px-24 py-16 shadow-[0_24px_64px_rgba(255,75,22,0.15)] min-w-[480px] animate-scaleUp"
          >
            <span className="text-2xl font-bold text-[#FF4B16] tracking-widest uppercase">
              SUA SENHA É
            </span>
            <span className="text-[180px] font-black text-[#121212] leading-none mt-4 select-all">
              {generatedSenha}
            </span>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <button 
              onClick={() => setStep('inicio')}
              className="bg-[#FF4B16] hover:bg-[#D83A0D] text-white text-2xl font-extrabold px-12 py-6 rounded-3xl shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Novo Pedido / Concluir
            </button>
            <p className="text-sm text-[#6B625C] animate-pulse">
              Esta tela reiniciará automaticamente em instantes...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#FFF7F0] flex overflow-hidden select-none animate-fadeIn">
      {/* COLUMN 1: Sidebar (Categories) */}
      <aside className="w-[400px] bg-white border-r border-[#DDE3EA] flex flex-col justify-between p-12">
        <div className="flex flex-col gap-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Sun size={48} className="text-[#FF4B16]" />
            <span className="text-4xl font-extrabold text-[#FF4B16] tracking-tight">Raízes</span>
          </div>

          {/* Categories List */}
          <nav className="flex flex-col gap-6">
            {(['Promoções', 'Tapiocas', 'Cuscuz', 'Bebidas', 'Sobremesas'] as TotemCategory[]).map(cat => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center gap-6 px-8 py-8 rounded-[24px] text-2xl font-bold transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#FF4B16] text-white shadow-lg shadow-[#FF4B16]/20' 
                      : 'bg-[#FFF7F0] text-[#121212] hover:bg-orange-50 border border-transparent hover:border-[#DDE3EA]'
                  }`}
                >
                  {getCategoryIcon(cat, active)}
                  <span>{cat}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Home Button */}
        <button 
          onClick={() => setStep('inicio')}
          className="w-full py-5 border border-dashed border-[#6B625C] text-[#6B625C] hover:bg-gray-50 rounded-[20px] text-xl font-bold cursor-pointer transition-colors"
        >
          Voltar à Tela Inicial
        </button>
      </aside>

      {/* COLUMN 2: Products Grid */}
      <main className="flex-1 flex flex-col p-16 overflow-y-auto">
        <h2 className="text-5xl font-black text-[#121212] mb-12">
          {activeCategory === 'Promoções' ? 'Ofertas Especiais' : `Escolha suas ${activeCategory}`}
        </h2>

        {currentProducts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl text-[#6B625C]">Carregando produtos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {currentProducts.map((product: any) => {
              return (
                <div 
                  key={product.id}
                  className="bg-white border-2 border-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col gap-6"
                >
                  {/* Image */}
                  <div className="w-full h-[240px] rounded-[24px] overflow-hidden bg-gray-50 relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-[#121212] line-clamp-1">{product.title}</h3>
                      <p className="text-lg text-[#6B625C] line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-3xl font-black text-[#FF4B16]">
                        {formatPrice(product.price)}
                      </span>
                      
                      <button
                        onClick={() => handleAddProduct(product)}
                        className="bg-[#FF4B16] hover:bg-[#D83A0D] text-white p-4 rounded-2xl shadow-md hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                        aria-label="Adicionar item"
                      >
                        <Plus size={28} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* COLUMN 3: Cart Panel */}
      <aside className="w-[480px] bg-white border-l border-[#DDE3EA] flex flex-col justify-between p-12">
        <div className="flex flex-col gap-10 overflow-hidden flex-1">
          <h2 className="text-4xl font-extrabold text-[#121212] tracking-tight">Seu Pedido</h2>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-2">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20 text-[#6B625C]">
                <Utensils size={64} className="stroke-[1.5]" />
                <p className="text-2xl font-bold">Carrinho Vazio</p>
                <p className="text-lg">Selecione itens no cardápio para adicionar ao seu pedido.</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-[#FFF7F0] pb-6"
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-xl font-bold text-[#121212] line-clamp-2">{item.name}</span>
                    <span className="text-lg font-black text-[#FF4B16]">{formatPrice(item.price * item.quantity)}</span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-4 bg-[#FFF7F0] p-3 rounded-2xl border border-[#DDE3EA]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-[#121212] hover:text-[#FF4B16] transition-colors cursor-pointer"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-xl font-black text-[#121212] w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-[#FF4B16] hover:text-[#D83A0D] transition-colors cursor-pointer"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Checkout Actions */}
        <div className="flex flex-col gap-6 pt-10 border-t border-[#FFF7F0]">
          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[#6B625C]">Total</span>
            <span className="text-4xl font-black text-[#FF4B16]">
              {formatPrice(getCartTotal())}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => cartItems.length > 0 && setStep('pagamento')}
              disabled={cartItems.length === 0}
              className={`w-full py-6 rounded-3xl text-2xl font-black tracking-wide text-white shadow-lg transition-all flex items-center justify-center cursor-pointer ${
                cartItems.length > 0 
                  ? 'bg-[#FF4B16] hover:bg-[#D83A0D] hover:scale-[1.02]' 
                  : 'bg-gray-300 shadow-none cursor-not-allowed'
              }`}
            >
              FINALIZAR
            </button>

            <button
              onClick={() => {
                clearCart();
                setStep('inicio');
              }}
              className="w-full py-4 text-xl font-bold text-[#6B625C] hover:text-red-600 transition-colors cursor-pointer"
            >
              Cancelar Pedido
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
