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
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

function App() {
  const [currentModule, setCurrentModule] = useState('To-Do List');
  const [currentFilter, setCurrentFilter] = useState('Today');

  return (
    <div className="app">
      <Sidebar
        currentModule={currentModule}
        setCurrentModule={setCurrentModule}
      />
      <Home
        currentModule={currentModule}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
    </div>
  );
}

export default App;
