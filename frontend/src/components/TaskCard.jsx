import React from 'react';
import { FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'Medium':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'Low':
      default:
        return 'bg-slate-100 border-slate-200 text-slate-600';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'In Progress':
        return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'Pending':
      default:
        return 'bg-amber-50 border-amber-200 text-amber-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dateString, status) => {
    if (status === 'Completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateString) < today;
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-full border border-slate-200/80 shadow-sm relative overflow-hidden animate-fade-in">
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border uppercase tracking-wider ${getPriorityStyle(task.priority)}`}>
          {task.priority} Priority
        </span>
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border uppercase tracking-wider ${getStatusStyle(task.status)}`}>
          {task.status}
        </span>
      </div>

      {/* Title & Description */}
      <div className="flex-1 mb-4">
        <h3 className={`text-lg font-bold text-slate-800 line-clamp-2 ${task.status === 'Completed' ? 'line-through text-slate-400 decoration-slate-400' : ''}`}>
          {task.title}
        </h3>
        <p className={`text-sm text-slate-600 mt-2 line-clamp-3 ${task.status === 'Completed' ? 'text-slate-400' : ''}`}>
          {task.description || 'No description provided.'}
        </p>
      </div>

      {/* Bottom section (Date, Status change, Actions) */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        {/* Due Date */}
        <div className="flex items-center gap-2 text-xs">
          <FaCalendarAlt className={isOverdue(task.dueDate, task.status) ? 'text-rose-600' : 'text-slate-450'} />
          <span className={isOverdue(task.dueDate, task.status) ? 'text-rose-600 font-semibold' : 'text-slate-450'}>
            Due: {formatDate(task.dueDate)}
            {isOverdue(task.dueDate, task.status) && ' (Overdue)'}
          </span>
        </div>

        {/* Quick Status and Action Controls */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {/* Status Quick changer dropdown */}
          <div className="relative flex-1">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task._id, e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <option value="Pending">Move to Pending</option>
              <option value="In Progress">Move to In Progress</option>
              <option value="Completed">Move to Completed</option>
            </select>
          </div>

          {/* Edit / Delete Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all duration-200 cursor-pointer"
              title="Edit Task"
            >
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-slate-200 transition-all duration-200 cursor-pointer"
              title="Delete Task"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
