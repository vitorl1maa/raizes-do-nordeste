import React from 'react';
import {
  Search, Book, Star, LayoutGrid, Plus, Settings, ChevronDown,
  MoreHorizontal, MousePointerClick, Edit, Trash2, X, Code, Eye
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  weight?: number; // Kept for backwards compatibility but ignored
  filled?: boolean; // Kept for backwards compatibility but ignored
}

const iconMap: Record<string, React.FC<any>> = {
  search: Search,
  book_2: Book,
  star: Star,
  category: LayoutGrid,
  add: Plus,
  settings: Settings,
  keyboard_arrow_down: ChevronDown,
  more_horiz: MoreHorizontal,
  touch_app: MousePointerClick,
  edit: Edit,
  delete: Trash2,
  close: X,
  code: Code,
  visibility: Eye,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  onClick,
}) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    console.warn(`Icon ${name} not found in Lucide mapping.`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      className={`select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    />
  );
};
