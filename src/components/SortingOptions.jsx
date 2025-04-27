'use client';

import { useState } from 'react';
import { useSort } from '@/Context/SortContext';
import { ArrowUpDown } from 'lucide-react';

export default function SortSelector() {
  const { ordering, setOrdering } = useSort();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setOrdering(value);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-end">
      <ArrowUpDown 
        className="w-6 h-6 text-gray-600 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => handleSelect('latest')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Latest First
          </button>
          <button
            onClick={() => handleSelect('title')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Title
          </button>
        </div>
      )}
    </div>
  );
}
