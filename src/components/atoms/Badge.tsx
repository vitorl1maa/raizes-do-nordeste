import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary text-bg-surface',
    secondary: 'bg-secondary text-text-primary',
    accent: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-success',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
