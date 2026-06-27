import React from 'react';
import { Icon } from '../atoms/Icon';
import { Checkbox } from '../atoms/Checkbox';
import { SelectField } from '../molecules/SelectField';
import type { SkillFilters, SkillCategory } from '../../types/skill';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SkillFilters;
  onFiltersChange: (filters: Partial<SkillFilters>) => void;
  onApply: () => void;
  onReset: () => void;
}

const categoryOptions: { value: string; label: string }[] = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Database', label: 'Database' },
  { value: 'AI/ML', label: 'AI/ML' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Security', label: 'Security' },
];

const dateOptions = [
  { value: 'all', label: 'Todos os períodos' },
  { value: 'last-week', label: 'Última semana' },
  { value: 'last-month', label: 'Último mês' },
  { value: 'last-year', label: 'Último ano' },
];

const popularTags = ['react', 'state', 'ui', 'database', 'devops'];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, filters, onFiltersChange, onApply, onReset }) => {
  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    const current = filters.tags;
    const next = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
    onFiltersChange({ tags: next });
  };

  return (
    <div className="fixed inset-0 z-50" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[400px] bg-sh-surface border-l border-sh-border flex flex-col gap-8 p-8">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h2 className="font-geist text-lg font-semibold text-sh-text-primary">Filtros Avançados</h2>
          <Icon name="close" size={20} className="text-sh-text-secondary cursor-pointer hover:text-sh-text-primary transition-colors" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
          <SelectField label="Categoria" value={filters.category} onChange={v => onFiltersChange({ category: v as SkillCategory | '' })} options={categoryOptions} placeholder="Todas as categorias" />

          <div className="flex flex-col gap-3">
            <span className="font-geist text-sm font-medium text-sh-text-primary">Tags Populares</span>
            {popularTags.map(tag => (
              <Checkbox key={tag} label={tag} checked={filters.tags.includes(tag)} onChange={() => toggleTag(tag)} />
            ))}
          </div>

          <SelectField label="Período" value={filters.dateRange} onChange={v => onFiltersChange({ dateRange: v as SkillFilters['dateRange'] })} options={dateOptions} placeholder="Selecionar período" />

          <div className="flex flex-col gap-1.5">
            <label className="font-geist text-sm font-medium text-sh-text-primary">Autor</label>
            <input type="text" value={filters.author} onChange={e => onFiltersChange({ author: e.target.value })} placeholder="Buscar por autor..." className="w-full rounded-full bg-sh-bg border border-sh-surface px-4 py-2 h-10 font-geist text-sm text-sh-text-primary placeholder:text-sh-text-muted outline-none focus:border-sh-primary transition-colors" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button onClick={onReset} className="flex-1 flex items-center justify-center h-10 rounded-full bg-sh-secondary font-mono text-sm font-medium text-white hover:bg-sh-surface-hover transition-colors cursor-pointer">Limpar Filtros</button>
          <button onClick={() => { onApply(); onClose(); }} className="flex-1 flex items-center justify-center h-10 rounded-full bg-sh-primary font-mono text-sm font-medium text-white hover:bg-sh-primary-hover transition-colors cursor-pointer">Aplicar Filtros</button>
        </div>
      </div>
    </div>
  );
};
