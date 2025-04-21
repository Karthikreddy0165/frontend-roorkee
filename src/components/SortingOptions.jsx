'use client';

import { useSort } from '@/Context/SortContext';

export default function SortSelector() {
  const { ordering, setOrdering } = useSort();

  return (
    <div className="flex items-center justify-end mb-4 space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        id="sort"
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
        className="block w-48 px-3 py-2 border border-gray-300 bg-white text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="latest">Latest First</option>
        <option value="title">Alphabetical Order</option>
      </select>
    </div>
  );
}
