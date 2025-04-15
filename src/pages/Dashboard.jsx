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
