import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskForm = ({ isOpen, onClose, onSubmit, task, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    status: 'Pending',
  });
  const [errors, setErrors] = useState({});

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const prioRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (task) {
      // Format date to YYYY-MM-DD for the HTML date input
      const formattedDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || '',
        dueDate: formattedDate,
        status: task.status || 'Pending',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        status: 'Pending',
      });
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    const fieldErrors = {};
    const trimmedVal = (value || '').trim();

    if (name === 'title') {
      if (!trimmedVal) {
        fieldErrors.title = 'Title is required.';
      } else if (trimmedVal.length < 3) {
        fieldErrors.title = 'Title must be at least 3 characters.';
      } else if (trimmedVal.length > 100) {
        fieldErrors.title = 'Title must not exceed 100 characters.';
      }
    }

    if (name === 'description') {
      if (!trimmedVal) {
        fieldErrors.description = 'Description is required.';
      } else if (trimmedVal.length < 10) {
        fieldErrors.description = 'Description must be at least 10 characters.';
      } else if (trimmedVal.length > 500) {
        fieldErrors.description = 'Description must not exceed 500 characters.';
      }
    }

    if (name === 'priority') {
      if (!value) {
        fieldErrors.priority = 'Please select a priority.';
      }
    }

    if (name === 'dueDate') {
      if (!value) {
        fieldErrors.dueDate = 'Please select a due date.';
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        if (selectedDate < today) {
          fieldErrors.dueDate = 'Due date cannot be in the past.';
        }
      }
    }

    return fieldErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Instant validation on input change to clear/update error alert
    const fieldErrors = validateField(name, value);
    setErrors((prev) => {
      const copy = { ...prev };
      if (fieldErrors[name]) {
        copy[name] = fieldErrors[name];
      } else {
        delete copy[name];
      }
      return copy;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const titleErr = validateField('title', formData.title);
    if (titleErr.title) newErrors.title = titleErr.title;

    const descErr = validateField('description', formData.description);
    if (descErr.description) newErrors.description = descErr.description;

    const prioErr = validateField('priority', formData.priority);
    if (prioErr.priority) newErrors.priority = prioErr.priority;

    const dateErr = validateField('dueDate', formData.dueDate);
    if (dateErr.dueDate) newErrors.dueDate = dateErr.dueDate;

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      // Focus the first invalid field sequentially: Title, Description, Priority, Due Date
      if (newErrors.title) {
        titleRef.current?.focus();
      } else if (newErrors.description) {
        descRef.current?.focus();
      } else if (newErrors.priority) {
        prioRef.current?.focus();
      } else if (newErrors.dueDate) {
        dateRef.current?.focus();
      }
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="glass-panel w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200/80 relative z-50 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 m-0">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              ref={titleRef}
              maxLength={100}
              placeholder="e.g. Complete math assignment"
              className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.title
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500 shadow-sm shadow-red-500/5'
                  : 'border-slate-200 focus:ring-blue-500 focus:border-blue-550'
              }`}
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1.5 block font-medium animate-slide-down">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              ref={descRef}
              rows="3"
              maxLength={500}
              placeholder="Provide a detailed task description..."
              className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all duration-200 resize-none ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500 shadow-sm shadow-red-500/5'
                  : 'border-slate-200 focus:ring-blue-500 focus:border-blue-550'
              }`}
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-1.5 block font-medium animate-slide-down">
                {errors.description}
              </span>
            )}
          </div>

          {/* Grid fields: Priority and Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
                Priority *
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                ref={prioRef}
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-700 focus:outline-none focus:ring-1 cursor-pointer transition-all duration-200 ${
                  errors.priority
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 shadow-sm shadow-red-500/5'
                    : 'border-slate-200 focus:ring-blue-500 focus:border-blue-550'
                }`}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <span className="text-red-500 text-xs mt-1.5 block font-medium animate-slide-down">
                  {errors.priority}
                </span>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                ref={dateRef}
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-200 cursor-pointer ${
                  errors.dueDate
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 shadow-sm shadow-red-500/5'
                    : 'border-slate-200 focus:ring-blue-500 focus:border-blue-550'
                }`}
              />
              {errors.dueDate && (
                <span className="text-red-500 text-xs mt-1.5 block font-medium animate-slide-down">
                  {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Status (Show in both create/edit mode but default to Pending) */}
          <div>
            <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{task ? 'Save Changes' : 'Save Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
