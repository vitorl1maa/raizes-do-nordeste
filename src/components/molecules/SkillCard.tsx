import React from 'react';
import { Icon } from '../atoms/Icon';
import { Tag } from '../atoms/Tag';
import type { Skill } from '../../types/skill';

interface SkillCardProps {
  skill: Skill;
  selected?: boolean;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  Frontend: '#3B82F6',
  Backend: '#10B981',
  DevOps: '#F59E0B',
  Database: '#8B5CF6',
  'AI/ML': '#06B6D4',
  Mobile: '#EC4899',
  Security: '#EF4444',
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  selected = false,
  onClick,
}) => {
  const color = categoryColors[skill.category] || '#3B82F6';

  const daysAgo = Math.floor(
    (Date.now() - new Date(skill.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const updatedText =
    daysAgo === 0
      ? 'Updated today'
      : daysAgo === 1
        ? 'Updated 1 day ago'
        : `Updated ${daysAgo} days ago`;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col bg-sh-surface-elevated border h-[220px] w-full text-left transition-all cursor-pointer hover:border-sh-surface-border hover:scale-[1.01] ${
        selected
          ? 'border-sh-primary shadow-[0_0_0_1px_#3B82F6]'
          : 'border-sh-border shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 px-5 pt-4 pb-2 w-full">
        <div className="flex items-center justify-between w-full">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded font-mono text-xs font-bold border"
            style={{
              color,
              backgroundColor: `${color}1F`,
              borderColor: color,
            }}
          >
            {skill.category}
          </span>
          <Icon
            name="more_horiz"
            size={16}
            className="text-sh-text-secondary"
          />
        </div>
        <span className="font-geist text-xl font-semibold text-sh-text-primary">
          {skill.name}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-5 pb-4 flex-1 w-full mt-1">
        <p className="font-geist text-sm text-sh-text-secondary leading-relaxed line-clamp-2">
          {skill.description}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {skill.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-geist text-xs text-sh-text-secondary">
            {updatedText}
          </span>
        </div>
      </div>
    </button>
  );
};
