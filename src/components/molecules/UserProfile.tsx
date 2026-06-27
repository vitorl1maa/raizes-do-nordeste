import React from 'react';
import { Icon } from '../atoms/Icon';

interface UserProfileProps {
  name: string;
  email: string;
  className?: string;
  isCollapsed?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  className = '',
  isCollapsed = false,
}) => {
  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      {!isCollapsed ? (
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="font-geist text-lg text-sh-text-primary truncate">
            {name}
          </span>
          <span className="font-geist text-base text-sh-text-primary truncate opacity-60">
            {email}
          </span>
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-sh-surface-hover flex items-center justify-center text-sh-text-primary font-bold mx-auto">
          {name.charAt(0)}
        </div>
      )}
      {!isCollapsed && (
        <Icon
          name="keyboard_arrow_down"
          size={24}
          className="text-sh-text-primary shrink-0"
        />
      )}
    </div>
  );
};
