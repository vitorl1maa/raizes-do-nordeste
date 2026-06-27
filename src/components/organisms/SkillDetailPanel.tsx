import React from 'react';
import { Icon } from '../atoms/Icon';
import { Tag } from '../atoms/Tag';
import { MetaRow } from '../molecules/MetaRow';
import type { Skill } from '../../types/skill';

interface SkillDetailPanelProps {
  skill: Skill | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
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

export const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({
  skill,
  onEdit,
  onDelete,
  onClose,
}) => {
  if (!skill) {
    return (
      <div className="flex flex-col items-center justify-center w-[440px] h-full bg-sh-surface border-l border-sh-border p-8 shrink-0">
        <Icon name="touch_app" size={48} weight={100} className="text-sh-text-muted mb-4" />
        <span className="font-geist text-sm text-sh-text-muted">
          Selecione uma skill para ver detalhes
        </span>
      </div>
    );
  }

  const color = categoryColors[skill.category] || '#3B82F6';
  const formattedDate = new Date(skill.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Parse markdown content into sections
  const sections = skill.content
    .split(/^## /m)
    .filter(Boolean)
    .map((section) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#+ /, '').trim();
      return title;
    });

  // Extract code blocks for display
  const codeBlockMatch = skill.content.match(/```[\s\S]*?```/);
  const codeBlock = codeBlockMatch
    ? codeBlockMatch[0].replace(/```\w*\n?/, '').replace(/```$/, '').trim()
    : null;

  // Get first paragraph as overview
  const overviewMatch = skill.content.match(/\n\n([^#`][\s\S]*?)(?=\n\n|$)/);
  const overview = overviewMatch
    ? overviewMatch[1].trim()
    : skill.description;

  return (
    <div className="flex flex-col gap-5 w-[440px] h-full bg-sh-surface border-l border-sh-border p-8 shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            {onClose && (
              <button onClick={onClose} className="p-1 hover:bg-sh-surface-hover rounded-full transition-colors mr-2">
                <Icon name="close" size={20} className="text-sh-text-secondary" />
              </button>
            )}
            <span
              className="inline-flex items-center px-2 py-1 rounded font-mono text-[10px] font-bold border"
              style={{
                color,
                backgroundColor: `${color}1F`,
                borderColor: color,
              }}
            >
              {skill.category}
            </span>
          </div>
          <h2 className="font-geist text-2xl font-bold text-sh-text-primary">
            {skill.name}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-sh-secondary font-mono text-sm font-medium text-white hover:bg-sh-surface-hover transition-colors cursor-pointer"
          >
            <Icon name="edit" size={16} weight={100} className="text-white" />
            <span>Editar</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-sh-error font-mono text-sm font-medium text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            <Icon name="delete" size={16} weight={100} className="text-white" />
            <span>Excluir</span>
          </button>
        </div>
      </div>

      {/* Meta */}
      <MetaRow
        items={[
          { label: 'AUTHOR', value: skill.author },
          { label: 'CREATED', value: formattedDate },
        ]}
      />

      {/* Body */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Doc Column */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <h3 className="font-geist text-lg font-semibold text-sh-text-primary">
            Overview
          </h3>
          <p className="font-geist text-sm text-sh-text-secondary leading-[1.6]">
            {overview}
          </p>

          {/* Code Block */}
          {codeBlock && (
            <div className="rounded-md bg-[#0F172A] border border-sh-border p-3 overflow-x-auto">
              <pre className="font-mono text-[11px] text-sh-text-secondary leading-relaxed whitespace-pre">
                {codeBlock}
              </pre>
            </div>
          )}
        </div>

        {/* TOC Column */}
        <div className="flex flex-col gap-2 w-[140px] shrink-0">
          <span className="font-geist text-sm font-semibold text-sh-text-primary mb-1">
            Contents
          </span>
          {sections.map((section, i) => (
            <span
              key={i}
              className="font-geist text-xs text-sh-text-secondary hover:text-sh-text-primary cursor-pointer transition-colors"
            >
              {section}
            </span>
          ))}

          {/* Tags */}
          <span className="font-geist text-sm font-semibold text-sh-text-primary mt-4 mb-1">
            Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {skill.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
