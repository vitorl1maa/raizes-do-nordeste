import React from 'react';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 w-full ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="font-mono text-sm font-medium text-sh-text-primary px-4 py-2.5 rounded-full hover:bg-sh-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        Previous
      </button>

      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sh-surface-hover font-mono text-sm text-sh-text-primary">
        {currentPage}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="font-mono text-sm font-medium text-sh-text-primary px-4 py-2.5 rounded-full hover:bg-sh-surface-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
