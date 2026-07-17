import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [taskStats, setTaskStats] = useState({ pending: 0, inProgress: 0, completed: 0 });

  return (
    <div className="min-h-screen bg-slate-55 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Navbar filters={filters} setFilters={setFilters} />

      {/* Main Workspace Dashboard */}
      <Home
        filters={filters}
        setFilters={setFilters}
        taskStats={taskStats}
        setTaskStats={setTaskStats}
      />
    </div>
  );
}

export default App;
