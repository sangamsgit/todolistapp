#!/bin/bash

echo "📁 Setting up folders..."
mkdir -p src/components src/pages src/utils src/data

echo "📦 Installing dependencies..."
npm install uuid date-fns react-router-dom clsx

echo "📦 Installing dev dependencies (optional)..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "🎨 Configuring Tailwind..."
cat > tailwind.config.js <<EOL
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

cat > src/index.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

echo "🧱 Creating basic components..."
cat > src/components/TaskList.jsx <<EOL
import React from 'react';

const TaskList = ({ tasks, onRemove }) => (
  <ul className="space-y-2">
    {tasks.map(task => (
      <li key={task.id} className="p-2 bg-white rounded shadow flex justify-between">
        <span>{task.text}</span>
        <button onClick={() => onRemove(task.id)} className="text-red-500">Remove</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
EOL

cat > src/components/AddTask.jsx <<EOL
import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        className="flex-1 p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
};

export default AddTask;
EOL

echo "📄 Creating sample pages..."
cat > src/pages/Dashboard.jsx <<EOL
import React from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const [tasks, setTasks] = React.useState([]);

  const handleAddTask = (text) => {
    setTasks([...tasks, { id: uuidv4(), text }]);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your To-Do List</h1>
      <AddTask onAdd={handleAddTask} />
      <TaskList tasks={tasks} onRemove={handleRemoveTask} />
    </div>
  );
};

export default Dashboard;
EOL

cat > src/App.jsx <<EOL
import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
EOL

echo "✅ All set! Now you can run 'npm start' and start building!"

