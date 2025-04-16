import React, { useState } from "react";
import "./TodayTab.css";

const TodayTab = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish Figma to React", completed: false },
    { id: 2, text: "Prepare hackathon notes", completed: false },
    { id: 3, text: "Review pull requests", completed: false },
  ]);

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  return (
    <div className="today-tab">
      <h2>Today’s Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            <span className="checkbox"></span>
            <span className="task-text">{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayTab;
