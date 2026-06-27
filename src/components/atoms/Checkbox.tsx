import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
    >
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          checked
            ? 'bg-sh-primary border-sh-primary'
            : 'border-sh-surface-border bg-transparent hover:border-sh-text-secondary'
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="font-geist text-sm text-sh-text-secondary group-hover:text-sh-text-primary transition-colors">
        {label}
      </span>
    </label>
  );
};
