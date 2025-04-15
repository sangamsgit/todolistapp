import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoDashboard from './components/ToDoDashboard';
// You can import other components like HabitTracker, Timer, etc., when built.

import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('To-Do List');
  const [currentFilter, setCurrentFilter] = useState('Today');

  return (
    <div className="app">
      <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />

      <div className="main-content">
        {selectedSection === 'To-Do List' && (
          <ToDoDashboard currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
        )}

        {selectedSection !== 'To-Do List' && (
          <div className="placeholder">
            <h2>{selectedSection}</h2>
            <p>This section is under construction ✌️</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
