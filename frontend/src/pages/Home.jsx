import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { FaCheckCircle, FaExclamationCircle, FaPlus, FaClipboardList, FaClock, FaSyncAlt } from 'react-icons/fa';

const Home = ({ filters, setFilters, taskStats, setTaskStats }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  // Fetch all tasks for stats calculation and local filtering
  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const data = await getTasks({});
      setTasks(data);
      calculateStats(data);
    } catch (error) {
      showNotification('error', 'Failed to retrieve tasks. Ensure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  // Calculate and store task statistics
  const calculateStats = (taskList) => {
    const stats = { pending: 0, inProgress: 0, completed: 0 };
    taskList.forEach((t) => {
      if (t.status === 'Completed') stats.completed++;
      else if (t.status === 'In Progress') stats.inProgress++;
      else stats.pending++;
    });
    setTaskStats(stats);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 3000);
  };

  const handleOpenCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        // Update task
        await updateTask(editingTask._id, formData);
        showNotification('success', 'Task updated successfully.');
      } else {
        // Create task
        await createTask(formData);
        showNotification('success', 'Task created successfully.');
      }
      setIsFormOpen(false);
      fetchTasksData();
    } catch (error) {
      showNotification('error', error.response?.data?.message || 'Error saving task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = (id) => {
    setTaskToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const executeDeleteTask = async () => {
    try {
      if (taskToDeleteId) {
        await deleteTask(taskToDeleteId);
        showNotification('success', 'Task deleted successfully.');
        fetchTasksData();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete task.');
    } finally {
      setIsDeleteModalOpen(false);
      setTaskToDeleteId(null);
    }
  };

  const handleQuickStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      showNotification('success', `Task status updated to ${newStatus}`);
      fetchTasksData();
    } catch (error) {
      showNotification('error', 'Failed to update task status.');
    }
  };

  // Perform search text, status, and priority filtering locally for instantaneous UI updates
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = !filters.status || task.status === filters.status;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (task.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && priorityMatch && (titleMatch || descMatch);
  });

  const totalTasksCount = taskStats.pending + taskStats.inProgress + taskStats.completed;

  return (
    <main className="flex-1 bg-slate-55 px-8 py-8 space-y-6 min-h-screen overflow-y-auto w-full">
      {/* Toast Notification */}
      {notification.message && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-semibold animate-fade-in z-50 flex items-center gap-2.5 transition-all duration-300 ${
            notification.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          {notification.type === 'error' ? (
            <FaExclamationCircle className="text-base text-rose-500" />
          ) : (
            <FaCheckCircle className="text-base text-emerald-500" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header section with "+ Add Task" button */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Task Management</h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Organize your tasks and boost your productivity.
          </p>
        </div>
        <button
          onClick={handleOpenCreateForm}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <FaPlus className="text-xs" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks Card */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-blue-600 rounded-xl shadow-sm flex items-center justify-center shrink-0">
            <FaClipboardList className="text-xl" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Total Tasks</span>
            <span className="text-3xl font-black text-slate-800 block leading-tight mt-0.5">{totalTasksCount}</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">All tasks</span>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-amber-50/40 border border-amber-100/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-amber-550 rounded-xl shadow-sm flex items-center justify-center shrink-0">
            <FaClock className="text-xl" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Pending</span>
            <span className="text-3xl font-black text-slate-800 block leading-tight mt-0.5">{taskStats.pending}</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">Tasks to do</span>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-indigo-650 rounded-xl shadow-sm flex items-center justify-center shrink-0 animate-spin-slow">
            <FaSyncAlt className="text-lg" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">In Progress</span>
            <span className="text-3xl font-black text-slate-800 block leading-tight mt-0.5">{taskStats.inProgress}</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">Tasks in progress</span>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-white text-emerald-600 rounded-xl shadow-sm flex items-center justify-center shrink-0">
            <FaCheckCircle className="text-xl" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Completed</span>
            <span className="text-3xl font-black text-slate-800 block leading-tight mt-0.5">{taskStats.completed}</span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">Tasks completed</span>
          </div>
        </div>
      </div>

      {/* Filter controls and Search Box */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Task table list */}
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteTask}
        onStatusChange={handleQuickStatusChange}
      />

      {/* Form modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={editingTask}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDeleteModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="glass-panel w-full max-w-md rounded-2xl shadow-2xl border border-slate-200/80 relative z-50 overflow-hidden p-6 animate-fade-in space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Delete Task?</h3>
            <p className="text-sm text-slate-650 leading-relaxed">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeDeleteTask}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
