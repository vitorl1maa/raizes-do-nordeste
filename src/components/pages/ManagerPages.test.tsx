import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ManagerDashboardPage } from './ManagerDashboardPage';
import { ManagerMenuPage } from './ManagerMenuPage';
import { useManagerAuthStore } from '../../store/managerAuthStore';

// Helper wrapper to render with router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Manager Administration Pages', () => {
  beforeEach(() => {
    // Reset login state before each test
    useManagerAuthStore.setState({ isLoggedIn: false });
  });

  it('renders login screen first when not authenticated on dashboard', () => {
    renderWithRouter(<ManagerDashboardPage />);
    
    // Checks if the login card is rendered
    expect(screen.getByText('Acesso da Equipe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite a senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acessar Painel' })).toBeInTheDocument();
  });

  it('renders login screen first when not authenticated on menu page', () => {
    renderWithRouter(<ManagerMenuPage />);
    
    expect(screen.getByText('Acesso da Equipe')).toBeInTheDocument();
  });

  it('allows manager to log in with correct credentials on dashboard', () => {
    renderWithRouter(<ManagerDashboardPage />);
    
    const userInput = screen.getByPlaceholderText('Digite o usuário');
    const passInput = screen.getByPlaceholderText('Digite a senha');
    const submitBtn = screen.getByRole('button', { name: 'Acessar Painel' });

    // Fill incorrect details
    fireEvent.change(userInput, { target: { value: 'incorrect_user' } });
    fireEvent.change(passInput, { target: { value: 'wrong_password' } });
    fireEvent.click(submitBtn);

    // Should show error message
    expect(screen.getByText('Usuário ou senha incorretos.')).toBeInTheDocument();

    // Fill correct details (gerencia / gen@2026)
    fireEvent.change(userInput, { target: { value: 'gerencia' } });
    fireEvent.change(passInput, { target: { value: 'gen@2026' } });
    fireEvent.click(submitBtn);

    // Should successfully log in and show the admin panel title and cards
    expect(screen.getByText('Raízes Admin')).toBeInTheDocument();
    expect(screen.getByText('Faturamento Diário')).toBeInTheDocument();
    expect(screen.getByText('Pedidos por Horário')).toBeInTheDocument();
    expect(screen.getByText('Alerta operacional')).toBeInTheDocument();
  });

  it('shows menu page contents when authenticated', () => {
    // Force authenticated state
    useManagerAuthStore.setState({ isLoggedIn: true });
    
    renderWithRouter(<ManagerMenuPage />);

    // Should render the admin panel menu page title and add button
    expect(screen.getByText('Raízes Admin')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Produto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar produto...')).toBeInTheDocument();
  });
});
