import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuPage } from './components/pages/MenuPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cardapio" element={<MenuPage />} />
        <Route path="/" element={<Navigate to="/cardapio" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
