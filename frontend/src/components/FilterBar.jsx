import React from 'react';
import { FaSearch } from 'react-icons/fa';

const FilterBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
          <FaSearch className="text-sm" />
        </span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default FilterBar;
