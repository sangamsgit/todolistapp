import React, { useState, useEffect } from 'react';
import './ToDoDashboard.css';

const ToDoDashboard = ({ currentFilter, setCurrentFilter }) => {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage or initialize with an empty array
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      category: currentFilter,
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit a task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter(
    (task) => task.category === currentFilter
  );

  return (
    <div className="todo-dashboard">
      <div className="filter-bar">
        {['Today', 'Important', 'Planned', 'Projects'].map((filter) => (
          <button
            key={filter}
            className={filter === currentFilter ? 'active' : ''}
            onClick={() => setCurrentFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder={`Add a new ${currentFilter} task`}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => editTask(task.id, e.target.textContent)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoDashboard;
