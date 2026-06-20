import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../atoms/Input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <Input
      icon={<Search size={20} />}
      placeholder="O que você quer comer hoje?"
      {...props}
    />
  );
};
