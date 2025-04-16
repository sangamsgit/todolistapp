import React, { useState } from 'react';
import TodayTasks from './TodayTasks';
import ImportantTasks from './ImportantTasks'; // Import ImportantTasks
import ProjectsTasks from './ProjectsTasks'; // Import ProjectsTasks
import PlannedTasks from './PlannedTasks'; // Import PlannedTasks
import './ToDoDashboard.css'; // Make sure the CSS file is imported

const ToDoDashboard = ({ currentFilter, setCurrentFilter }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete UI design', completed: false },
    { id: '2', title: 'Start working on backend', completed: false },
    { id: '3', title: 'Push code to GitHub', completed: true },
  ]);

  return (
    <div className="todo-dashboard">
      <div className="filter-tabs">
        {['Today', 'Important', 'Planned', 'Projects'].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
            onClick={() => setCurrentFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Conditionally render the corresponding tasks based on the currentFilter */}
      {currentFilter === 'Today' && (
        <TodayTasks tasks={tasks} setTasks={setTasks} />
      )}
      {currentFilter === 'Important' && (
        <ImportantTasks />
      )}
      {currentFilter === 'Projects' && (
        <ProjectsTasks />
      )}
      {currentFilter === 'Planned' && (
        <PlannedTasks />
      )}

      {/* Display this message if the category isn't available yet */}
      {currentFilter !== 'Today' && currentFilter !== 'Important' && currentFilter !== 'Planned' && currentFilter !== 'Projects' && (
        <div className="coming-soon">⚠️ This filter is coming soon.</div>
      )}
    </div>
  );
};

export default ToDoDashboard;
