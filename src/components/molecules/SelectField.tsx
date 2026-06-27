import React from 'react';
import { Icon } from '../atoms/Icon';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecionar...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-geist text-sm font-medium text-sh-text-primary">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full rounded-full bg-sh-bg border border-sh-surface px-4 py-2 h-10 font-geist text-sm text-sh-text-primary outline-none focus:border-sh-primary transition-colors cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="keyboard_arrow_down" size={20} weight={100} className="text-sh-text-secondary" />
        </div>
      </div>
    </div>
  );
};
