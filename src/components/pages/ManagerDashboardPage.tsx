import React from 'react';
import { ManagerLayout } from '../organisms/ManagerLayout';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useOrderStore } from '../../store/orderStore';

// Hourly order data for chart
const CHART_DATA = [
  { hora: '08h', pedidos: 8 },
  { hora: '10h', pedidos: 18 },
  { hora: '12h', pedidos: 45 },
  { hora: '14h', pedidos: 28 },
  { hora: '16h', pedidos: 20 },
  { hora: '18h', pedidos: 38 },
  { hora: '20h', pedidos: 55 },
  { hora: '22h', pedidos: 15 },
];

// Top selling products mock
const TOP_PRODUCTS = [
  { name: 'Tapioca de Carne de Sol', sales: 48, revenue: 1195.20, category: 'Tapiocas' },
  { name: 'Cuscuz Completo', sales: 35, revenue: 647.50, category: 'Cuscuz' },
  { name: 'Suco de Acerola', sales: 30, revenue: 360.00, category: 'Bebidas' },
  { name: 'Bolo de Rolo', sales: 25, revenue: 247.50, category: 'Sobremesas' },
];

export const ManagerDashboardPage: React.FC = () => {
  const { orders } = useOrderStore();

  // Dynamic calculations based on orderStore orders to make the dashboard feel real
  const completedOrders = orders.filter(o => o.status === 'completed');
  const dynamicTotalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const baseRevenue = 2450.00;
  const currentRevenue = baseRevenue + dynamicTotalRevenue;
  
  const baseOrderCount = 142;
  const currentOrderCount = baseOrderCount + orders.length;

  const cards = [
    {
      title: 'Faturamento Diário',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentRevenue),
      change: '+12% vs ontem',
      isPositive: true,
      icon: <DollarSign className="text-emerald-600" size={24} />,
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
    },
    {
      title: 'Pedidos Concluídos',
      value: currentOrderCount.toString(),
      change: '+8% vs ontem',
      isPositive: true,
      icon: <ShoppingBag className="text-blue-600" size={24} />,
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
    },
    {
      title: 'Ticket Médio',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentRevenue / (currentOrderCount || 1)),
      change: '+5% vs ontem',
      isPositive: true,
      icon: <TrendingUp className="text-amber-600" size={24} />,
      bg: 'bg-amber-50/50',
      border: 'border-amber-100',
    },
    {
      title: 'Tempo de Preparo',
      value: '14 min',
      change: '-2 min vs ontem',
      isPositive: true,
      icon: <Clock className="text-purple-600" size={24} />,
      bg: 'bg-purple-50/50',
      border: 'border-purple-100',
    },
  ];

  return (
    <ManagerLayout title="Visão Geral">
      <div className="flex flex-col gap-8">
        
        {/* Alerts Banner */}
        <div className="flex items-center gap-4 bg-red-50 border border-red-100 p-5 rounded-[24px] text-red-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-700" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm">Alerta operacional</h4>
            <p className="text-sm font-medium mt-0.5 text-red-700">
              A Unidade Pina está com um atraso médio de 18 minutos nos pedidos. Considere direcionar mais equipe.
            </p>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-6 rounded-[24px] border ${card.border} shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-text-secondary">{card.title}</span>
                <div className={`p-3 rounded-xl ${card.bg}`}>
                  {card.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-primary">{card.value}</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-2 inline-block">
                  {card.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Sales Table */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          
          {/* Recharts Bar Chart Card */}
          <div className="xl:col-span-3 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Pedidos por Horário</h3>
              <p className="text-sm text-text-secondary mt-0.5">Frequência de pedidos ao longo do dia de hoje</p>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="hora" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#6B625C', fontSize: 12, fontWeight: 500 }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#6B625C', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#FFF7F0', radius: 12 }}
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '16px', 
                      border: '1px solid #FFEBE3',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                    labelStyle={{ fontWeight: 'bold', color: '#121212' }}
                    itemStyle={{ color: '#FF4B16', fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="pedidos" 
                    fill="#FF4B16" 
                    radius={[8, 8, 0, 0]} 
                    maxBarSize={40} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Selling Products Card */}
          <div className="xl:col-span-2 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Mais Vendidos</h3>
                <p className="text-sm text-text-secondary mt-0.5">Produtos líderes de vendas na unidade</p>
              </div>
              <Award className="text-primary" size={24} />
            </div>

            <div className="flex flex-col gap-4">
              {TOP_PRODUCTS.map((prod, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#FFF7F0]/40 transition-colors border border-transparent hover:border-orange-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-black text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-text-primary">{prod.name}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{prod.category} • {prod.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-text-primary">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.revenue)}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      Meta 100%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-bold text-text-secondary hover:text-text-primary transition-all flex items-center justify-center gap-2 cursor-pointer mt-auto border border-gray-100">
              Ver Relatório Completo <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </ManagerLayout>
  );
};
