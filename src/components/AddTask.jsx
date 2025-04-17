import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput("");
  };

  return (
    <div className="task-item dummy-task" style={{ backgroundColor: "#52a3ff" }}>
      <span className="circle-placeholder" />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
        style={{ backgroundColor: "#8cc6ff" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
    </div>
  );
};

export default AddTask;
