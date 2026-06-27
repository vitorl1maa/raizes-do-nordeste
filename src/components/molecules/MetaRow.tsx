import React from 'react';

interface MetaRowProps {
  items: { label: string; value: string }[];
  className?: string;
}

export const MetaRow: React.FC<MetaRowProps> = ({ items, className = '' }) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-sh-text-secondary uppercase tracking-wider">
            {item.label}
          </span>
          <span className="font-geist text-[11px] text-sh-text-primary">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
