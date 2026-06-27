import React, { useState } from 'react';
import { Icon } from '../atoms/Icon';
import type { SkillCategory, CreateSkillPayload } from '../../types/skill';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CreateSkillPayload) => void;
}

const categories: SkillCategory[] = ['Frontend','Backend','DevOps','Database','AI/ML','Mobile','Security'];

export const AddSkillModal: React.FC<AddSkillModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory | ''>('');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name || !category || !content) return;
    onSave({ name, category: category as SkillCategory, tags: tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(Boolean), content });
    setName(''); setCategory(''); setTagsInput(''); setContent('');
  };

  const renderPreview = () => {
    if (!content) return <span className="text-sh-text-muted font-geist text-sm italic">A preview será exibida aqui...</span>;
    return content.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h4 key={i} className="font-geist text-sm font-semibold text-sh-text-primary mt-3 mb-1">{line.slice(4)}</h4>;
      if (line.startsWith('## ')) return <h3 key={i} className="font-geist text-base font-semibold text-sh-text-primary mt-4 mb-1">{line.slice(3)}</h3>;
      if (line.startsWith('# ')) return <h2 key={i} className="font-geist text-lg font-bold text-sh-text-primary mt-4 mb-2">{line.slice(2)}</h2>;
      if (line.startsWith('```')) return null;
      if (line.startsWith('- ')) return <li key={i} className="font-geist text-xs text-sh-text-secondary ml-4 list-disc">{line.slice(2)}</li>;
      if (!line.trim()) return <br key={i} />;
      return <p key={i} className="font-geist text-xs text-sh-text-secondary leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-[1000px] h-[740px] flex flex-col bg-sh-surface-elevated border border-sh-border shadow-lg overflow-hidden">
        <div className="flex flex-col gap-1 px-6 py-5">
          <h2 className="font-geist text-lg font-semibold text-sh-text-primary">Adicionar Nova Skill</h2>
          <p className="font-geist text-xs text-sh-text-secondary">Cadastre uma nova skill técnica na base de conhecimento centralizada.</p>
        </div>
        <div className="flex flex-col gap-4 flex-1 px-6 pb-5 min-h-0">
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-geist text-sm font-medium text-sh-text-primary">Nome</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: React, Docker..." className="w-full rounded-full bg-sh-bg border border-sh-surface px-4 py-2 h-10 font-geist text-sm text-sh-text-primary placeholder:text-sh-text-muted outline-none focus:border-sh-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-geist text-sm font-medium text-sh-text-primary">Categoria</label>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value as SkillCategory)} className="appearance-none w-full rounded-full bg-sh-bg border border-sh-surface px-4 py-2 h-10 font-geist text-sm text-sh-text-primary outline-none focus:border-sh-primary transition-colors cursor-pointer">
                  <option value="">Selecionar...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><Icon name="keyboard_arrow_down" size={20} weight={100} className="text-sh-text-secondary" /></div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-geist text-sm font-medium text-sh-text-primary">Tags</label>
              <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="ui, library, react" className="w-full rounded-full bg-sh-bg border border-sh-surface px-4 py-2 h-10 font-geist text-sm text-sh-text-primary placeholder:text-sh-text-muted outline-none focus:border-sh-primary transition-colors" />
            </div>
          </div>
          <div className="flex gap-4 flex-1 min-h-0">
            <div className="flex flex-col gap-2 flex-1 rounded-md bg-[#0F172A] border border-sh-border p-4 min-h-0">
              <div className="flex items-center gap-2">
                <Icon name="code" size={16} weight={100} className="text-sh-text-muted" />
                <span className="font-mono text-xs text-sh-text-muted">Markdown</span>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={"# Título da Skill\n\nEscreva o conteúdo em Markdown..."} className="flex-1 w-full bg-transparent font-mono text-xs text-sh-text-secondary leading-relaxed outline-none resize-none placeholder:text-sh-text-muted" />
            </div>
            <div className="flex flex-col gap-2 flex-1 rounded-md bg-sh-surface border border-sh-border p-4 min-h-0 overflow-y-auto">
              <div className="flex items-center gap-2">
                <Icon name="visibility" size={16} weight={100} className="text-sh-text-muted" />
                <span className="font-mono text-xs text-sh-text-muted">Preview</span>
              </div>
              <div className="flex flex-col">{renderPreview()}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4">
          <button onClick={onClose} className="flex items-center justify-center h-10 px-4 rounded-full bg-sh-secondary font-mono text-sm font-medium text-white hover:bg-sh-surface-hover transition-colors cursor-pointer">Cancelar</button>
          <button onClick={handleSave} disabled={!name || !category || !content} className="flex items-center justify-center h-10 px-4 rounded-full bg-sh-primary font-mono text-sm font-medium text-white hover:bg-sh-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Salvar Skill</button>
        </div>
      </div>
    </div>
  );
};
