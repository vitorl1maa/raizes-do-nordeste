import React, { useState } from 'react';
import { Header } from '../organisms/Header';
import { Trophy, Info, CupSoda, Ticket, CakeSlice, Check } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

interface HistoryItem {
  id: number;
  text: string;
  points: number;
  type: 'earn' | 'redeem';
}

export const LoyaltyPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [points, setPoints] = useState(120); // Initial simulated points
  const [toastMessage, setToastMessage] = useState('');
  
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, text: "Pedido #8899 - Unidade Boa Viagem", points: 24, type: 'earn' },
    { id: 2, text: "Pedido #8842 - Unidade Pina", points: 32, type: 'earn' },
    { id: 3, text: "Resgate: Bebida Grátis", points: -50, type: 'redeem' }
  ]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRedeem = (cost: number, rewardName: string) => {
    if (points >= cost) {
      setPoints(prev => prev - cost);
      setHistory(prev => [
        { id: Date.now(), text: `Resgate: ${rewardName}`, points: -cost, type: 'redeem' },
        ...prev
      ]);
      showToast(`Você resgatou: ${rewardName}!`);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col pt-28 relative">
      <Header />
      
      {/* Toast Notificação */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-transform animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)] flex items-center gap-3 min-w-[300px]">
            <Check className="w-6 h-6 text-green-500 shrink-0" />
            <span className="text-slate-800 font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-10 py-10 flex flex-col gap-12 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary m-0">
          Clube Raízes
        </h1>
        
        {/* Points Card */}
        <div className="bg-bg-surface border-2 border-primary rounded-[24px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 shadow-[0_8px_24px_rgba(255,75,22,0.08)]">
          <Trophy size={80} className="text-primary shrink-0" />
          
          <div className="flex-1 flex flex-col gap-4 w-full">
            <h2 className="text-2xl md:text-[28px] font-bold text-primary">
              Você tem {points} pontos
            </h2>
            
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">
                  Faltam 30 pontos para a próxima recompensa
                </span>
                <span className="font-semibold text-text-primary">
                  120 / 150
                </span>
              </div>
              
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${(120/150)*100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FFF7F0] p-6 rounded-2xl w-full md:w-[280px] flex flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2 font-semibold text-text-primary text-base">
              <Info size={20} className="text-primary shrink-0" />
              Como funciona?
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              A cada pedido você acumula pontos para trocar por benefícios exclusivos. 
              Os pontos valem por 6 meses.
            </p>
          </div>
        </div>
        
        {/* Rewards */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Recompensas Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reward 1 */}
            <div className={`bg-bg-surface border border-gray-100 shadow-sm rounded-[24px] p-6 flex flex-col gap-4 transition-all ${points >= 50 ? 'hover:shadow-md' : 'opacity-75'}`}>
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${points >= 50 ? 'bg-[#FFD447]' : 'bg-gray-100'}`}>
                  <CupSoda size={24} className={points >= 50 ? 'text-text-primary' : 'text-text-secondary'} />
                </div>
                <div className={`${points >= 50 ? 'bg-[#FFF7F0] text-primary' : 'bg-gray-100 text-text-secondary'} font-bold text-sm py-1.5 px-3 rounded-xl`}>
                  50 pts
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary">Bebida Grátis</h3>
              {points >= 50 ? (
                <button 
                  onClick={() => handleRedeem(50, 'Bebida Grátis')}
                  className="w-full bg-primary cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors mt-auto"
                >
                  Resgatar
                </button>
              ) : (
                <button disabled className="w-full bg-white border border-gray-200 text-text-secondary font-semibold py-3 rounded-xl mt-auto">
                  Faltam pontos
                </button>
              )}
            </div>
            
            {/* Reward 2 */}
            <div className={`bg-bg-surface border border-gray-100 shadow-sm rounded-[24px] p-6 flex flex-col gap-4 transition-all ${points >= 100 ? 'hover:shadow-md' : 'opacity-75'}`}>
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${points >= 100 ? 'bg-[#FFD447]' : 'bg-gray-100'}`}>
                  <Ticket size={24} className={points >= 100 ? 'text-text-primary' : 'text-text-secondary'} />
                </div>
                <div className={`${points >= 100 ? 'bg-[#FFF7F0] text-primary' : 'bg-gray-100 text-text-secondary'} font-bold text-sm py-1.5 px-3 rounded-xl`}>
                  100 pts
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary">Desconto R$ 10</h3>
              {points >= 100 ? (
                <button 
                  onClick={() => handleRedeem(100, 'Desconto R$ 10')}
                  className="w-full bg-primary cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors mt-auto"
                >
                  Resgatar
                </button>
              ) : (
                <button disabled className="w-full bg-white border border-gray-200 text-text-secondary font-semibold py-3 rounded-xl mt-auto">
                  Faltam pontos
                </button>
              )}
            </div>
            
            {/* Reward 3 */}
            <div className={`bg-bg-surface border border-gray-100 shadow-sm rounded-[24px] p-6 flex flex-col gap-4 transition-all ${points >= 150 ? 'hover:shadow-md' : 'opacity-75'}`}>
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${points >= 150 ? 'bg-[#FFD447]' : 'bg-gray-100'}`}>
                  <CakeSlice size={24} className={points >= 150 ? 'text-text-primary' : 'text-text-secondary'} />
                </div>
                <div className={`${points >= 150 ? 'bg-[#FFF7F0] text-primary' : 'bg-gray-100 text-text-secondary'} font-bold text-sm py-1.5 px-3 rounded-xl`}>
                  150 pts
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary">Sobremesa Grátis</h3>
              {points >= 150 ? (
                <button 
                  onClick={() => handleRedeem(150, 'Sobremesa Grátis')}
                  className="w-full bg-primary cursor-pointer hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors mt-auto"
                >
                  Resgatar
                </button>
              ) : (
                <button disabled className="w-full bg-white border border-gray-200 text-text-secondary font-semibold py-3 rounded-xl mt-auto">
                  Faltam pontos
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* History */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Histórico de Pontos
          </h2>
          
          <div className="bg-bg-surface border border-gray-100 rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-sm">
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2">
                  <span className="text-text-secondary text-sm">{item.text}</span>
                  <span className={`font-bold ${item.type === 'earn' ? 'text-green-700' : 'text-red-600'}`}>
                    {item.points > 0 ? `+ ${item.points}` : `- ${Math.abs(item.points)}`} pts
                  </span>
                </div>
                {index < history.length - 1 && <hr className="border-gray-100" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
