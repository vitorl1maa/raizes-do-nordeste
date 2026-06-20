import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-text-secondary">{icon}</div>}
        <input
          className={`w-full bg-bg-surface border border-gray-200 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            icon ? 'pl-12' : ''
          } ${error ? 'border-error focus:ring-error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};
