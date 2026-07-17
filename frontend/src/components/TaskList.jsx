import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import { FaInbox, FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination to page 1 whenever the lists change due to filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [tasks]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <FaSpinner className="text-4xl animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-semibold tracking-wide">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-10 py-16 flex flex-col items-center justify-center border border-slate-200/80 shadow-sm text-center max-w-md mx-auto animate-fade-in">
        <div className="p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
          <FaInbox className="text-3xl" />
        </div>
        <h4 className="text-lg font-bold text-slate-800">No tasks found</h4>
        <p className="text-sm text-slate-500 mt-2 px-4">
          Get started by creating a task, or adjust your filter query above!
        </p>
      </div>
    );
  }

  // Pagination calculation
  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in flex flex-col">
      {/* Table responsive container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100">
              <th className="px-6 py-4.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
              <th className="px-6 py-4.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4.5 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4.5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info */}
        <span className="text-xs font-semibold text-slate-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalTasks)} of {totalTasks} tasks
        </span>

        {/* Buttons */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            {/* Prev */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition ${
                currentPage === 1
                  ? 'border-slate-100 text-slate-300 bg-slate-55/50 cursor-not-allowed'
                  : 'border-slate-200 text-slate-650 bg-white hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <FaChevronLeft className="text-[10px]" />
            </button>

            {/* Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                    : 'border border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center transition ${
                currentPage === totalPages
                  ? 'border-slate-100 text-slate-300 bg-slate-55/50 cursor-not-allowed'
                  : 'border-slate-200 text-slate-650 bg-white hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
