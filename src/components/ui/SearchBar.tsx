import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
  initialValue?: string;
}

export default function SearchBar({
  onSearch,
  initialValue = '',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="mb-8 w-full">
      <input
        type="text"
        placeholder="Search campaigns..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-custom-yellow focus:outline-none focus:ring-2 focus:ring-custom-yellow focus:ring-opacity-50"
      />
    </div>
  );
}
