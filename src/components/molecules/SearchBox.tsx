import React from 'react';
import { Icon } from '../atoms/Icon';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = 'Buscar skills...',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2 rounded bg-sh-surface-elevated border border-sh-border px-3 py-1.5 w-60 focus-within:border-sh-primary transition-colors ${className}`}
    >
      <Icon name="search" size={16} weight={100} className="text-sh-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent text-sm font-geist text-sh-text-primary placeholder:text-sh-text-muted outline-none w-full"
      />
    </div>
  );
};
