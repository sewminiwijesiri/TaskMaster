import React from 'react';
import { FaSearch, FaRegFlag, FaFilter } from 'react-icons/fa';

const FilterBar = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
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

      {/* Select Controls */}
      <div className="flex items-center gap-3">
        {/* Priority Filter */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-450 pointer-events-none flex items-center">
            <FaRegFlag className="text-xs text-slate-500" />
          </span>
          <select
            value={filters.priority || ''}
            onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
            className="pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm appearance-none min-w-[150px]"
          >
            <option value="">Filter by Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <span className="absolute right-3.5 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-450 pointer-events-none flex items-center">
            <FaFilter className="text-[10px] text-slate-500" />
          </span>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm appearance-none min-w-[140px]"
          >
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <span className="absolute right-3.5 pointer-events-none text-slate-400 text-[10px]">▼</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
