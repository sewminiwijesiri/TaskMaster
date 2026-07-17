import React from 'react';
import { FaTasks, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

const Navbar = ({ taskStats = { pending: 0, inProgress: 0, completed: 0 } }) => {
  return (
    <header className="glass-panel sticky top-0 z-40 px-6 py-4 shadow-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/10 text-white">
            <FaTasks className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
              Task<span className="text-indigo-600">Master</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Manage your daily goals efficiently</p>
          </div>
        </div>

        {/* Task Counters Dashboard */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Pending badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
            <FaClock className="text-sm text-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">Pending</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.pending}
            </span>
          </div>

          {/* In Progress badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
            <FaSpinner className="text-sm animate-spin text-indigo-500" style={{ animationDuration: '3s' }} />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">In Progress</span>
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.inProgress}
            </span>
          </div>

          {/* Completed badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
            <FaCheckCircle className="text-sm text-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">Completed</span>
            <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.completed}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
