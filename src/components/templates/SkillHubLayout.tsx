import React from 'react';
import { Sidebar } from '../organisms/Sidebar';

interface SkillHubLayoutProps {
  children: React.ReactNode;
}

export const SkillHubLayout: React.FC<SkillHubLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-sh-bg overflow-hidden">
      <Sidebar />
      <main className="flex flex-1 min-w-0 h-full">
        {children}
      </main>
    </div>
  );
};
