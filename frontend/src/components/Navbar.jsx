import React from 'react';
import { FaTasks, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';

const Navbar = ({ taskStats = { pending: 0, inProgress: 0, completed: 0 } }) => {
  return (
    <header className="glass-panel sticky top-0 z-40 px-6 py-4 shadow-lg border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md shadow-indigo-500/20 text-white">
            <FaTasks className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
              Task<span className="text-indigo-400">Master</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Manage your daily goals efficiently</p>
          </div>
        </div>

        {/* Task Counters Dashboard */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Pending badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FaClock className="text-sm" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">Pending</span>
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.pending}
            </span>
          </div>

          {/* In Progress badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FaSpinner className="text-sm animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">In Progress</span>
            <span className="bg-indigo-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.inProgress}
            </span>
          </div>

          {/* Completed badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FaCheckCircle className="text-sm" />
            <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">Completed</span>
            <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
              {taskStats.completed}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
