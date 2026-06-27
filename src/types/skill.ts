export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  content: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'DevOps'
  | 'Database'
  | 'AI/ML'
  | 'Mobile'
  | 'Security';

export interface SkillFilters {
  search: string;
  category: SkillCategory | '';
  tags: string[];
  dateRange: 'all' | 'last-week' | 'last-month' | 'last-year';
  author: string;
}

export interface CreateSkillPayload {
  name: string;
  category: SkillCategory;
  tags: string[];
  content: string;
}

export type SortOption = 'recent' | 'name' | 'category';
