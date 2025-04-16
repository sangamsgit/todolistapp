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


import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ToDoDashboard from './components/ToDoDashboard';
import TodayTasks from './components/TodayTasks'; // Import the TodayTasks component
import './App.css';
// import './responsive.css';
import { ListTodo, CalendarDays, Timer, NotebookPen, BadgeCheck } from "lucide-react";

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

        {selectedSection === 'Today' && (  // Add this condition for 'Today' section
          <TodayTasks />
        )}

        {selectedSection !== 'To-Do List' && selectedSection !== 'Today' && (
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
