import React from 'react';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <Input
        type="search"
        placeholder="Search farming tips..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e?.target?.value)}
        className="max-w-md"
      />
    </div>
  );
};

export default SearchBar;