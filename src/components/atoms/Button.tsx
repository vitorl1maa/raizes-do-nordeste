import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-bg-surface hover:bg-primary-dark disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300',
    secondary: 'bg-secondary text-text-primary hover:bg-yellow-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200',
    outline: 'border-2 border-primary text-primary hover:bg-orange-50 disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent',
    ghost: 'text-text-secondary hover:bg-orange-50 disabled:text-gray-400 disabled:hover:bg-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
