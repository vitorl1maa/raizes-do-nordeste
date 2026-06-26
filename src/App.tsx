import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuPage } from './components/pages/MenuPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { PromotionsPage } from './components/pages/PromotionsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { CookiesDrawer } from './components/organisms/CookiesDrawer';
import { AvatarModal } from './components/organisms/AvatarModal';
import { AttendantDashboardPage } from './components/pages/AttendantDashboardPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { TotemPage } from './components/pages/TotemPage';
import { ManagerDashboardPage } from './components/pages/ManagerDashboardPage';
import { ManagerMenuPage } from './components/pages/ManagerMenuPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cardapio" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/acompanhamento" element={<OrderTrackingPage />} />
        <Route path="/promocoes" element={<PromotionsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/atendimento" element={<AttendantDashboardPage />} />
        <Route path="/produto/:id" element={<ProductDetailPage />} />
        <Route path="/totem" element={<TotemPage />} />
        <Route path="/gerente" element={<Navigate to="/gerente/dashboard" replace />} />
        <Route path="/gerente/dashboard" element={<ManagerDashboardPage />} />
        <Route path="/gerente/cardapio" element={<ManagerMenuPage />} />
        <Route path="/" element={<Navigate to="/cardapio" replace />} />
      </Routes>
      <CookiesDrawer />
      <AvatarModal />
    </BrowserRouter>
  );
}

export default App;
