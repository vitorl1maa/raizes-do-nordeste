import React from 'react';
import { Logo } from '../atoms/Logo';
import { NavItem, NavSectionTitle } from '../molecules/NavItem';
import { UserProfile } from '../molecules/UserProfile';
import { useSkillStore } from '../../store/skillStore';
import { Icon } from '../atoms/Icon';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'Skills Library',
  onNavigate,
}) => {
  const { isSidebarCollapsed, toggleSidebar } = useSkillStore();
  
  return (
    <aside className={`flex flex-col h-full bg-sh-surface border-r border-sh-border shrink-0 transition-all duration-300 ${isSidebarCollapsed ? 'w-[88px]' : 'w-[280px]'}`}>
      {/* Header */}
      <div className={`flex items-center gap-2 h-[88px] py-6 border-b border-sh-border ${isSidebarCollapsed ? 'px-0 justify-center flex-col' : 'px-8 justify-between flex-row'}`}>
        <Logo isCollapsed={isSidebarCollapsed} />
        <button onClick={toggleSidebar} className="p-1 hover:bg-sh-surface-hover rounded-full transition-colors">
          <Icon name={isSidebarCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_left'} size={20} className="text-sh-text-secondary" />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex flex-col gap-2 flex-1 py-4 overflow-y-auto ${isSidebarCollapsed ? 'px-2' : ''}`}>
        <NavSectionTitle title="KNOWLEDGE BASE" isCollapsed={isSidebarCollapsed} />
        <div className="px-0 flex flex-col gap-1">
          <NavItem
            icon="book_2"
            label="Skills Library"
            active={activeItem === 'Skills Library'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => onNavigate?.('Skills Library')}
          />
          <NavItem
            icon="star"
            label="Favorites"
            active={activeItem === 'Favorites'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => onNavigate?.('Favorites')}
          />
          <NavItem
            icon="category"
            label="Categories"
            active={activeItem === 'Categories'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => onNavigate?.('Categories')}
          />
        </div>

        <NavSectionTitle title="CONTRIBUTE" isCollapsed={isSidebarCollapsed} />
        <div className="px-0 flex flex-col gap-1">
          <NavItem
            icon="add"
            label="New Document"
            active={activeItem === 'New Document'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => onNavigate?.('New Document')}
          />
          <NavItem
            icon="settings"
            label="Settings"
            active={activeItem === 'Settings'}
            isCollapsed={isSidebarCollapsed}
            onClick={() => onNavigate?.('Settings')}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className={`py-6 ${isSidebarCollapsed ? 'px-2' : 'px-8'}`}>
        <UserProfile name="Joe Doe" email="joe@acmecorp.com" isCollapsed={isSidebarCollapsed} />
      </div>
    </aside>
  );
};
