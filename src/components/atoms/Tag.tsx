import React from 'react';

interface TagProps {
  label: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded bg-sh-secondary font-geist text-[10px] text-sh-text-secondary ${className}`}
    >
      {label}
    </span>
  );
};
