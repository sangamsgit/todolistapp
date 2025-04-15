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
