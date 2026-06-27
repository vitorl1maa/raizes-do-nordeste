import React from 'react';
import { SkillCard } from '../molecules/SkillCard';
import { PaginationControl } from '../molecules/PaginationControl';
import type { Skill } from '../../types/skill';

interface SkillGridProps {
  skills: Skill[];
  selectedSkillId: string | null;
  onSelectSkill: (skill: Skill) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SkillGrid: React.FC<SkillGridProps> = ({
  skills,
  selectedSkillId,
  onSelectSkill,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Split skills into rows of 3
  const rows: Skill[][] = [];
  for (let i = 0; i < skills.length; i += 3) {
    rows.push(skills.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      {/* Grid */}
      <div className="flex flex-col gap-4 w-full">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 w-full">
            {row.map((skill) => (
              <div key={skill.id} className="flex-1 min-w-0">
                <SkillCard
                  skill={skill}
                  selected={skill.id === selectedSkillId}
                  onClick={() => onSelectSkill(skill)}
                />
              </div>
            ))}
            {/* Fill empty space if row has less than 3 items */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 min-w-0" />
              ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {skills.length > 0 && (
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {skills.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16">
          <span className="font-mono text-sm text-sh-text-muted">
            Nenhuma skill encontrada
          </span>
          <span className="font-geist text-xs text-sh-text-muted">
            Tente ajustar os filtros ou adicione uma nova skill.
          </span>
        </div>
      )}
    </div>
  );
};
