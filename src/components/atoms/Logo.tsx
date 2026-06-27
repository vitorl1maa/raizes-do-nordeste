import React from 'react';

export const Logo: React.FC<{ className?: string, isCollapsed?: boolean }> = ({ className = '', isCollapsed = false }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-sh-primary rounded-sm flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 2h6v4h-6v-4z"
            fill="white"
          />
        </svg>
      </div>
      {!isCollapsed && (
        <span className="font-mono text-lg font-bold text-sh-primary leading-none whitespace-nowrap overflow-hidden">
          SKILL HUB
        </span>
      )}
    </div>
  );
};
