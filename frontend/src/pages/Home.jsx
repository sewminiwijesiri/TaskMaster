import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Home = ({ setTaskStats }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Fetch tasks when filters change
  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const data = await getTasks(filters);
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
  }, [filters]);

  // Dynamically calculate and bubble stats up to navbar
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
      if (editingTask) {
        // Update task
        await updateTask(editingTask._id, formData);
        showNotification('success', 'Task updated successfully!');
      } else {
        // Create task
        await createTask(formData);
        showNotification('success', 'Task created successfully!');
      }
      setIsFormOpen(false);
      fetchTasksData();
    } catch (error) {
      showNotification('error', error.response?.data?.message || 'Error saving task.');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        showNotification('success', 'Task deleted successfully.');
        fetchTasksData();
      } catch (error) {
        showNotification('error', 'Failed to delete task.');
      }
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

  // Perform search text filtering locally for instantaneous UI updates
  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (task.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descMatch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-6">
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

      {/* Title section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Your Workspace</h2>
          <p className="text-sm text-slate-500 mt-1">Add, update, filter and organize your daily items.</p>
        </div>
      </div>

      {/* Filter and search bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddTaskClick={handleOpenCreateForm}
      />

      {/* Task list displaying the grid of task cards */}
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleDeleteTask}
        onStatusChange={handleQuickStatusChange}
      />

      {/* Create/Edit Modal form popup */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />
    </main>
  );
};

export default Home;
