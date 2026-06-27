import { create } from 'zustand';
import type { Skill, SkillFilters, CreateSkillPayload } from '../types/skill';
import { mockSkills } from '../mocks/skills';

const defaultFilters: SkillFilters = {
  search: '',
  category: '',
  tags: [],
  dateRange: 'all',
  author: '',
};

interface SkillState {
  skills: Skill[];
  selectedSkill: Skill | null;
  filters: SkillFilters;
  isAddModalOpen: boolean;
  isFilterDrawerOpen: boolean;
  isSidebarCollapsed: boolean;
  isDetailPanelOpen: boolean;
  currentPage: number;
  itemsPerPage: number;

  setSelectedSkill: (skill: Skill | null) => void;
  setFilters: (filters: Partial<SkillFilters>) => void;
  resetFilters: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  toggleSidebar: () => void;
  closeDetailPanel: () => void;
  addSkill: (payload: CreateSkillPayload) => void;
  deleteSkill: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setCurrentPage: (page: number) => void;
  getFilteredSkills: () => Skill[];
  getPaginatedSkills: () => Skill[];
  getTotalPages: () => number;
  getActiveFilterCount: () => number;
}

export const useSkillStore = create<SkillState>((set, get) => ({
  skills: mockSkills,
  selectedSkill: mockSkills[0],
  filters: defaultFilters,
  isAddModalOpen: false,
  isFilterDrawerOpen: false,
  isSidebarCollapsed: false,
  isDetailPanelOpen: false,
  currentPage: 1,
  itemsPerPage: 6,

  setSelectedSkill: (skill) => set({ selectedSkill: skill, isDetailPanelOpen: !!skill }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1,
    })),

  resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  closeDetailPanel: () => set({ isDetailPanelOpen: false, selectedSkill: null }),

  addSkill: (payload) =>
    set((state) => {
      const newSkill: Skill = {
        id: crypto.randomUUID(),
        name: payload.name,
        category: payload.category,
        description: payload.content.split('\n').find((l) => l.trim() && !l.startsWith('#'))?.trim() || '',
        content: payload.content,
        tags: payload.tags,
        author: 'You',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
      };
      return { skills: [newSkill, ...state.skills], isAddModalOpen: false };
    }),

  deleteSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id),
      selectedSkill: state.selectedSkill?.id === id ? null : state.selectedSkill,
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      ),
      selectedSkill:
        state.selectedSkill?.id === id
          ? { ...state.selectedSkill, isFavorite: !state.selectedSkill.isFavorite }
          : state.selectedSkill,
    })),

  setCurrentPage: (page) => set({ currentPage: page }),

  getFilteredSkills: () => {
    const { skills, filters } = get();
    return skills.filter((skill) => {
      if (filters.search && !skill.name.toLowerCase().includes(filters.search.toLowerCase()) && !skill.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category && skill.category !== filters.category) return false;
      if (filters.tags.length > 0 && !filters.tags.some((t) => skill.tags.includes(t))) return false;
      if (filters.author && !skill.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
      if (filters.dateRange !== 'all') {
        const updated = new Date(skill.updatedAt);
        const now = new Date();
        const diff = now.getTime() - updated.getTime();
        const days = diff / (1000 * 60 * 60 * 24);
        if (filters.dateRange === 'last-week' && days > 7) return false;
        if (filters.dateRange === 'last-month' && days > 30) return false;
        if (filters.dateRange === 'last-year' && days > 365) return false;
      }
      return true;
    });
  },

  getPaginatedSkills: () => {
    const { currentPage, itemsPerPage } = get();
    const filtered = get().getFilteredSkills();
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  },

  getTotalPages: () => {
    const { itemsPerPage } = get();
    const filtered = get().getFilteredSkills();
    return Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  },

  getActiveFilterCount: () => {
    const { filters } = get();
    let count = 0;
    if (filters.category) count++;
    if (filters.tags.length > 0) count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.author) count++;
    return count;
  },
}));
