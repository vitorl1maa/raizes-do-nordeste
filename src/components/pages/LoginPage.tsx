import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import logo from '../../assets/images/logo-pequeno.png';
import { authenticateMockUser } from '../../mocks/auth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      const result = authenticateMockUser(email, password);
      
      if (result.success && result.user) {
        login(result.user.name, result.user.email);
        const from = location.state?.from || '/cardapio';
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Erro ao fazer login.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 text-left">
      <div className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="Raízes" className="w-20" />
          <h1 className="text-2xl font-bold text-text-primary">Bem-vindo de volta</h1>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-error rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            label="E-mail"
            type="email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <Input 
            label="Senha"
            type="password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Sua senha"
          />

          <Button type="submit" fullWidth className="mt-2">
            Entrar
          </Button>
        </form>

        <p className="text-center text-text-secondary text-sm">
          Não tem uma conta? <Link to="/register" state={{ from: location.state?.from }} className="text-primary font-semibold hover:underline">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};
