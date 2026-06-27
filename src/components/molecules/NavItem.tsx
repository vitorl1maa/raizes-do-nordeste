import React from 'react';
import { Icon } from '../atoms/Icon';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  isCollapsed = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 rounded-full transition-colors cursor-pointer ${
        isCollapsed ? 'justify-center w-12 h-12 p-0 mx-auto' : 'w-full px-4 py-3'
      } ${
        active
          ? 'bg-sh-surface-hover text-sh-text-primary'
          : 'text-sh-text-primary hover:bg-sh-surface-hover/50'
      }`}
      title={isCollapsed ? label : undefined}
    >
      <Icon name={icon} size={24} className="text-inherit shrink-0" />
      {!isCollapsed && <span className="font-geist text-lg leading-snug whitespace-nowrap overflow-hidden">{label}</span>}
    </button>
  );
};

interface NavSectionTitleProps {
  title: string;
  isCollapsed?: boolean;
}

export const NavSectionTitle: React.FC<NavSectionTitleProps> = ({ title, isCollapsed = false }) => {
  if (isCollapsed) return <div className="h-4" />;
  return (
    <div className="px-4 py-4 w-full">
      <span className="font-mono text-sm text-sh-text-primary tracking-wide">
        {title}
      </span>
    </div>
  );
};
