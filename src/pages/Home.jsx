import React from 'react';
import ToDoDashboard from '../components/ToDoDashboard';

const Home = ({ currentModule, currentFilter, setCurrentFilter }) => {
  switch (currentModule) {
    case 'To-Do List':
      return (
        <ToDoDashboard
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      );
    case 'Habit Tracker':
      return <div className="placeholder">📊 Habit Tracker (Coming soon)</div>;
    case 'Timer':
      return <div className="placeholder">⏱️ Timer (Coming soon)</div>;
    case 'Calendar':
      return <div className="placeholder">📅 Calendar (Coming soon)</div>;
    case 'Notes':
      return <div className="placeholder">📝 Notes (Coming soon)</div>;
    default:
      return <div className="placeholder">🚧 Unknown Module</div>;
  }
};

export default Home;
