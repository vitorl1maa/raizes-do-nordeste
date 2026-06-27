import React from 'react';
import { Icon } from '../atoms/Icon';
import { SearchBox } from '../molecules/SearchBox';

interface TopActionsBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onAddSkillClick: () => void;
  activeFilterCount?: number;
}

export const TopActionsBar: React.FC<TopActionsBarProps> = ({
  searchValue,
  onSearchChange,
  onFilterClick,
  onAddSkillClick,
  activeFilterCount = 0,
}) => {
  return (
    <div className="flex items-center justify-between w-full h-12">
      {/* Left */}
      <div className="flex items-center gap-3">
        <SearchBox value={searchValue} onChange={onSearchChange} />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onFilterClick}
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-sh-secondary font-mono text-sm font-medium text-white hover:bg-sh-surface-hover transition-colors cursor-pointer"
        >
          <span>Filtros</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sh-primary text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
        <button
          onClick={onAddSkillClick}
          className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-sh-primary font-mono text-sm font-medium text-white hover:bg-sh-primary-hover transition-colors cursor-pointer"
        >
          <Icon name="add" size={18} weight={100} className="text-white" />
          <span>Add Skill</span>
        </button>
      </div>
    </div>
  );
};
