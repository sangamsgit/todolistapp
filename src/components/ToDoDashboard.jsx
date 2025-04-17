import React, { useState } from 'react';
import TodayTasks from './TodayTasks';
import ImportantTasks from './ImportantTasks';
import ProjectsTasks from './ProjectsTasks';
import PlannedTasks from './PlannedTasks';
import './ToDoDashboard.css';

const ToDoDashboard = ({ currentFilter, setCurrentFilter }) => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete UI design', completed: false },
    { id: '2', title: 'Start working on backend', completed: false },
    { id: '3', title: 'Push code to GitHub', completed: true },
  ]);

  const filters = [
    { name: 'Today', color: 'default' },
    { name: 'Important', color: 'orange' },
    { name: 'Projects', color: 'green' },
    { name: 'Planned', color: 'violet' },
  ];

  return (
    <div className="todo-dashboard">
      <div className="filter-tabs">
        {filters.map(({ name, color }) => (
          <button
            key={name}
            className={`filter-btn ${currentFilter === name ? 'active' : ''}`}
            onClick={() => setCurrentFilter(name)}
            style={{ backgroundColor: currentFilter === name ? color : '' }}
          >
            {name}
          </button>
        ))}
      </div>

      {currentFilter === 'Today' && (
        <TodayTasks tasks={tasks} setTasks={setTasks} />
      )}
      {currentFilter === 'Important' && <ImportantTasks />}
      {currentFilter === 'Projects' && <ProjectsTasks />}
      {currentFilter === 'Planned' && <PlannedTasks />}

      {![ 'Today', 'Important', 'Planned', 'Projects' ].includes(currentFilter) && (
        <div className="coming-soon">⚠️ This filter is coming soon.</div>
      )}
    </div>
  );
};

export default ToDoDashboard;
