import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuPage } from './components/pages/MenuPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { PromotionsPage } from './components/pages/PromotionsPage';

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
        <Route path="/" element={<Navigate to="/cardapio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
