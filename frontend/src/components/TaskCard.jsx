import React from 'react';
import { FaTrash, FaEdit, FaRegCalendar } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return {
          pill: 'bg-rose-50 border-rose-100 text-rose-750',
          dot: 'bg-rose-500',
        };
      case 'Medium':
        return {
          pill: 'bg-amber-50 border-amber-105 text-amber-750',
          dot: 'bg-amber-500',
        };
      case 'Low':
      default:
        return {
          pill: 'bg-emerald-55/60 border-emerald-100 text-emerald-750',
          dot: 'bg-emerald-500',
        };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return {
          pill: 'bg-emerald-55/60 border-emerald-100 text-emerald-750',
          dot: 'bg-emerald-500',
        };
      case 'In Progress':
        return {
          pill: 'bg-blue-50 border-blue-100 text-blue-750',
          dot: 'bg-blue-500',
        };
      case 'Pending':
      default:
        return {
          pill: 'bg-slate-100 border-slate-200/80 text-slate-600',
          dot: 'bg-slate-500',
        };
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

  const handleCheckboxChange = () => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    onStatusChange(task._id, nextStatus);
  };

  const prio = getPriorityStyle(task.priority);
  const stat = getStatusStyle(task.status);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-150">
      {/* Checkbox & Task Details */}
      <td className="px-6 py-4 align-middle">
        <div className="flex items-start gap-4">
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={task.status === 'Completed'}
              onChange={handleCheckboxChange}
              className="w-4.5 h-4.5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition duration-150"
            />
          </div>
          <div>
            <div className={`text-sm font-semibold text-slate-800 tracking-tight ${task.status === 'Completed' ? 'line-through text-slate-400 font-normal' : ''}`}>
              {task.title}
            </div>
            <div className={`text-xs text-slate-500 mt-0.5 leading-relaxed max-w-md ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>
              {task.description || 'No description provided.'}
            </div>
          </div>
        </div>
      </td>

      {/* Priority Badge */}
      <td className="px-6 py-4 align-middle">
        <div className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-fit ${prio.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${prio.dot}`}></span>
          {task.priority}
        </div>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 align-middle">
        <div className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-fit ${stat.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`}></span>
          {task.status}
        </div>
      </td>

      {/* Due Date */}
      <td className="px-6 py-4 align-middle whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-650">
          <FaRegCalendar className="text-slate-400 text-sm" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </td>

      {/* Action Buttons */}
      <td className="px-6 py-4 align-middle whitespace-nowrap text-right">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-150 cursor-pointer"
            title="Edit Task"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors duration-150 cursor-pointer"
            title="Delete Task"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskCard;
