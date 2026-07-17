import React from 'react';
import TaskCard from './TaskCard';
import { FaInbox, FaSpinner } from 'react-icons/fa';

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <FaSpinner className="text-4xl animate-spin text-indigo-500 mb-3" />
        <p className="text-sm font-medium tracking-wide">Loading tasks...</p>
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task._id}>
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
