import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoDashboard from './components/ToDoDashboard';
import TodayTasks from './components/TodayTasks';
import TimerPage from './components/TimerPage'; // ✅ Import your TimerPage
import NotePage from './components/NotesPage';
import './App.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { ListTodo, CalendarDays, Timer, NotebookPen, BadgeCheck } from "lucide-react";
import HabitTracker from './components/HabitTracker';

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

        {selectedSection === 'Today' && (
          <TodayTasks />
        )}

        {selectedSection === 'Timer' && (
          <TimerPage />
        )}

        {selectedSection === 'Note' && (
          <NotePage />
        )}

        {selectedSection === 'Habit tracker' && (
          <HabitTracker setSelectedSection={setSelectedSection} />
        )}

        {/* Placeholder for any unhandled sections */}
        {selectedSection !== 'To-Do List' &&
          selectedSection !== 'Today' &&
          selectedSection !== 'Timer' &&
          selectedSection !== 'Note' &&
          selectedSection !== 'Habit tracker' && (
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
