import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuPage } from './components/pages/MenuPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cardapio" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/cardapio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
