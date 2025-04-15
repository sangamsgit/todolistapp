import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentModule, setCurrentModule }) => {
  const modules = ['To-Do List', 'Habit Tracker', 'Timer', 'Calendar', 'Notes'];

  return (
    <div className="sidebar">
      <h2 className="logo">ProductiveMe</h2>
      <ul>
        {modules.map(module => (
          <li
            key={module}
            className={currentModule === module ? 'active' : ''}
            onClick={() => setCurrentModule(module)}
          >
            {module}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
