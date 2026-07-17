import React from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const FilterBar = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  onAddTaskClick
}) => {
  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilters((prev) => ({ ...prev, priority: e.target.value }));
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800/80">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-1">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
            <FaSearch className="text-sm" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Filter Group */}
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={filters.status || ''}
              onChange={handleStatusChange}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/80 text-sm text-slate-250 focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={filters.priority || ''}
              onChange={handlePriorityChange}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700/80 text-sm text-slate-250 focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTaskClick}
        className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        <FaPlus className="text-xs" />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default FilterBar;
