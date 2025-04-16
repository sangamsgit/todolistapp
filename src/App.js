// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const addTask = () => {
//     if (task.trim() === '') return;
//     setTasks([...tasks, task]);
//     setTask('');
//   };

//   const removeTask = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     <div className="container">
//       <h1>To-Do List</h1>
//       <input
//         type="text"
//         value={task}
//         placeholder="Enter task..."
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button onClick={addTask}>Add</button>

//       <ul>
//         {tasks.map((t, i) => (
//           <li key={i}>
//             {t}
//             <button onClick={() => removeTask(i)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoDashboard from './components/ToDoDashboard';
import TodayTasks from './components/TodayTasks';
import TimerPage from './components/TimerPage';
import NotePage from './components/NotesPage';
import CalendarPage from './components/CalendarPage';
import HabitTracker from './components/HabitTracker'; // Import HabitTracker
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('To-Do List');
  const [currentFilter, setCurrentFilter] = useState('Today');

  return (
    <div className="app">
      <Sidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      <div className="main-content">
        {selectedSection === 'To-Do List' && (
          <ToDoDashboard
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        )}

        {selectedSection === 'Today' && <TodayTasks />}
        {selectedSection === 'Timer' && <TimerPage />}
        {selectedSection === 'Notes' && <NotePage />}
        {selectedSection === 'Calendar' && <CalendarPage />}
        {selectedSection === 'Habit Tracker' && <HabitTracker />} {/* This line is now active */}
        
        {/* Placeholder for unfinished sections */}
        {['To-Do List', 'Today', 'Timer', 'Notes','Calendar', 'Habit Tracker'].indexOf(selectedSection) === -1 && (
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

