import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Ticket, Truck, Tag, Store, Copy, Clock, Check } from 'lucide-react';
import { Button } from '../atoms/Button';
import { useCartStore } from '../../store/cartStore';

export const PromotionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, applyCoupon } = useCartStore();
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleCopyCoupon = (code: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Cupom ${code} copiado com sucesso!`);
      }).catch(() => {
        showToast(`Erro ao auto-copiar. Digite ${code} manualmente.`);
      });
    } else {
      showToast(`Anote o cupom: ${code}`);
    }
  };

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
    showToast(`Cupom ${code} ativado no seu carrinho!`);
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col text-left">
      <Header />

      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 md:px-10 pt-28 pb-10 flex flex-col gap-10">
        
        {/* Banner Destaque */}
        <section className="bg-gradient-to-r from-orange-500 to-primary rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 flex flex-col items-start gap-4">
            <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase backdrop-blur-md">
              Mês do Nordeste
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-md">
              20% OFF em todo o Cardápio!
            </h1>
            <p className="text-white/90 text-lg max-w-md mb-2">
              Use o cupom abaixo e aproveite o melhor da nossa culinária.
            </p>
            <div className="flex items-center gap-3 bg-white/10 p-2 pl-6 rounded-2xl border border-white/20 backdrop-blur-md">
              <span className="text-2xl font-bold tracking-widest">RAIZES20</span>
              <button onClick={() => handleCopyCoupon('RAIZES20')} className="bg-white text-primary p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" aria-label="Copiar cupom">
                <Copy size={20} />
              </button>
            </div>
          </div>
          
          <div className="absolute -right-10 -bottom-10 md:-right-20 md:-bottom-20 opacity-20">
            <Ticket size={250} className="md:w-[300px] md:h-[300px]" />
          </div>
        </section>

        {/* Lista de Cupons */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-text-primary m-0">Cupons Disponíveis</h2>
            <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-text-secondary">
              <Store size={16} className="text-primary" />
              Unidade Boa Viagem
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Cupom 1 - Frete Grátis */}
            <div className="bg-bg-surface p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Frete Grátis</h3>
                  <p className="text-text-secondary text-sm">Válido para pedidos acima de R$ 50,00.</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Truck size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-primary">Cupom: FRETE0</span>
                  <span className="text-xs text-text-secondary">Validade: 30/06/2026</span>
                </div>
                <Button onClick={() => handleApplyCoupon('FRETE0')}>Aplicar</Button>
              </div>
            </div>

            {/* Cupom 2 - Primeira Compra */}
            <div className="bg-bg-surface p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">10% na Primeira Compra</h3>
                  <p className="text-text-secondary text-sm">Exclusivo para novos clientes.</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Tag size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-primary">Cupom: BEMVINDO10</span>
                  <span className="text-xs text-text-secondary">Validade: Indeterminado</span>
                </div>
                <Button onClick={() => handleApplyCoupon('BEMVINDO10')}>Aplicar</Button>
              </div>
            </div>

            {/* Cupom 3 - Unidade Pina (Indisponível) */}
            <div className="bg-bg-base p-6 rounded-[24px] border border-gray-200 opacity-60 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Promoção Unidade Pina</h3>
                  <p className="text-text-secondary text-sm">Ganhe uma bebida na compra de 2 tapiocas.</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                  <Store size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-primary">Cupom: PINA2X1</span>
                  <span className="text-xs text-text-secondary">Validade: 25/06/2026</span>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-text-secondary">
                  Indisponível aqui
                </div>
              </div>
            </div>

            {/* Cupom 4 - Cuscuz (Expirado) */}
            <div className="bg-bg-base p-6 rounded-[24px] border border-gray-200 opacity-60 flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Dia do Cuscuz</h3>
                  <p className="text-text-secondary text-sm">50% de desconto em qualquer cuscuz.</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                  <Clock size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-text-primary">Cupom: CUSCUZ50</span>
                  <span className="text-xs text-text-secondary">Validade: Ontem</span>
                </div>
                <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-text-secondary">
                  Expirado
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Toast Notificação */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-transform animate-fade-in-up">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 min-w-[300px]">
            <Check className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-text-primary font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
