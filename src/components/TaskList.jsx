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
