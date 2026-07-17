import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [taskStats, setTaskStats] = useState({ pending: 0, inProgress: 0, completed: 0 });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar taskStats={taskStats} />
      <Home setTaskStats={setTaskStats} />
      <footer className="py-6 border-t border-slate-900/60 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
