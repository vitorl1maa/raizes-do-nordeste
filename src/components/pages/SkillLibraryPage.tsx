import React, { useEffect } from 'react';
import { SkillHubLayout } from '../templates/SkillHubLayout';
import { TopActionsBar } from '../organisms/TopActionsBar';
import { SkillGrid } from '../organisms/SkillGrid';
import { SkillDetailPanel } from '../organisms/SkillDetailPanel';
import { AddSkillModal } from '../organisms/AddSkillModal';
import { FilterDrawer } from '../organisms/FilterDrawer';
import { useSkillStore } from '../../store/skillStore';

export const SkillLibraryPage: React.FC = () => {
  const {
    selectedSkill, filters, isAddModalOpen, isFilterDrawerOpen, isDetailPanelOpen, currentPage,
    setSelectedSkill, setFilters, resetFilters, openAddModal, closeAddModal,
    openFilterDrawer, closeFilterDrawer, closeDetailPanel, addSkill, deleteSkill, setCurrentPage,
    getPaginatedSkills, getTotalPages, getActiveFilterCount,
  } = useSkillStore();

  const skills = getPaginatedSkills();
  const totalPages = getTotalPages();
  const activeFilterCount = getActiveFilterCount();

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAddModalOpen) closeAddModal();
        else if (isFilterDrawerOpen) closeFilterDrawer();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isAddModalOpen, isFilterDrawerOpen, closeAddModal, closeFilterDrawer]);

  return (
    <SkillHubLayout>
      {/* Left Side — Library */}
      <div className="flex flex-col gap-6 flex-1 p-8 pl-6 h-full min-w-0 overflow-y-auto">
        <TopActionsBar
          searchValue={filters.search}
          onSearchChange={(v) => setFilters({ search: v })}
          onFilterClick={openFilterDrawer}
          onAddSkillClick={openAddModal}
          activeFilterCount={activeFilterCount}
        />
        <SkillGrid
          skills={skills}
          selectedSkillId={selectedSkill?.id ?? null}
          onSelectSkill={setSelectedSkill}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Right Side — Detail Panel */}
      {isDetailPanelOpen && (
        <SkillDetailPanel
          skill={selectedSkill}
          onClose={closeDetailPanel}
          onDelete={() => {
            if (selectedSkill) deleteSkill(selectedSkill.id);
            closeDetailPanel();
          }}
        />
      )}

      {/* Modals / Drawers */}
      <AddSkillModal isOpen={isAddModalOpen} onClose={closeAddModal} onSave={addSkill} />
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={closeFilterDrawer}
        onReset={resetFilters}
      />
    </SkillHubLayout>
  );
};
