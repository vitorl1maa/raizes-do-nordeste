import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import logo from '../../assets/images/logo-pequeno.png';
import { registerMockUser } from '../../mocks/auth';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    
    if (name && email && password) {
      const result = registerMockUser({ name, email, phone, password });
      
      if (result.success) {
        // Automatically login after successful registration
        login(name, email);
        const from = location.state?.from || '/cardapio';
        navigate(from, { replace: true });
      } else {
        setError(result.error || "Erro ao registrar conta.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 text-left py-10">
      <div className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="Raízes" className="w-20" />
          <h1 className="text-2xl font-bold text-text-primary">Crie sua conta</h1>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-error rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            label="Nome"
            type="text" 
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome completo"
          />
          <Input 
            label="E-mail"
            type="email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
          <Input 
            label="Telefone"
            type="tel" 
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="(00) 00000-0000"
          />
          <Input 
            label="Senha"
            type="password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Crie uma senha"
          />
          <Input 
            label="Confirmar senha"
            type="password" 
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Repita sua senha"
          />

          <Button type="submit" fullWidth className="mt-2">
            Criar conta
          </Button>
        </form>

        <p className="text-center text-text-secondary text-sm">
          Já tem uma conta? <Link to="/login" state={{ from: location.state?.from }} className="text-primary font-semibold hover:underline">Fazer login</Link>
        </p>
      </div>
    </div>
  );
};
