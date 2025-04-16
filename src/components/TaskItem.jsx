import React, { useState } from 'react';

const TaskItem = ({ task, toggleTask, updateTaskTitle }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={task.title}
          onChange={(e) => updateTaskTitle(task.id, e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {task.title || 'Untitled Task'}
        </span>
      )}
    </div>
  );
};

export default TaskItem;
