import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TotemPage } from './TotemPage';

// Mock the zustand stores to avoid state persistence issues during testing
vi.mock('../../store/cartStore', () => ({
  useCartStore: () => ({
    items: [],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    getCartTotal: () => 0
  })
}));

vi.mock('../../store/orderStore', () => ({
  useOrderStore: () => ({
    addOrder: vi.fn()
  })
}));

describe('TotemPage Component', () => {
  it('renders the start screen with title and touch instruction', () => {
    render(<TotemPage />);
    
    // Check if main heading is present
    expect(screen.getByText('Raízes do Nordeste')).toBeInTheDocument();
    expect(screen.getByText('Autoatendimento')).toBeInTheDocument();
    
    // Check if toque para iniciar is present
    expect(screen.getByText('TOQUE PARA INICIAR')).toBeInTheDocument();
  });

  it('navigates to cardápio screen when clicked', () => {
    render(<TotemPage />);
    
    const startScreen = screen.getByText('TOQUE PARA INICIAR').closest('div');
    expect(startScreen).toBeInTheDocument();
    
    if (startScreen) {
      fireEvent.click(startScreen);
    }
    
    // Check if it renders the category sidebar and title after click
    expect(screen.getByText('Seu Pedido')).toBeInTheDocument();
    expect(screen.getByText('Escolha suas Tapiocas')).toBeInTheDocument();
  });
});
