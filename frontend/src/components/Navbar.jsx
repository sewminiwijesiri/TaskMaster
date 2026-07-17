import React from 'react';
import { FaClipboardCheck, FaListUl, FaClock, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const Navbar = ({ filters, setFilters }) => {
  const menuItems = [
    { label: 'All Tasks', value: '', icon: <FaListUl /> },
    { label: 'Pending', value: 'Pending', icon: <FaClock className="text-amber-500" /> },
    { label: 'In Progress', value: 'In Progress', icon: <FaSpinner className="text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} /> },
    { label: 'Completed', value: 'Completed', icon: <FaCheckCircle className="text-emerald-500" /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-6 min-h-screen">
      <div className="space-y-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/20">
            <FaClipboardCheck className="text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">TaskFlow</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Task Management</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = filters.status === item.value;
            return (
              <button
                key={item.label}
                onClick={() => setFilters((prev) => ({ ...prev, status: item.value }))}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-55/70 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Filters</span>

          {/* Priority Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Priority</label>
            <select
              value={filters.priority || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status Filter Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Promobox Footer */}
      <div className="mt-8 p-4 bg-blue-50/50 border border-blue-50/80 rounded-2xl flex flex-col items-start gap-2.5">
        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
          <FaClipboardCheck className="text-base" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">Stay Organized</h4>
          <p className="text-[11px] text-slate-500 leading-normal mt-1">
            Plan your tasks, set priorities and get things done!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
