import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TodayTasks.css";

const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage or use default dummy ones
  useEffect(() => {
    const saved = localStorage.getItem("todayTasks");
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTasks(parsed);
      } else {
        throw new Error(); // fallback to default
      }
    } catch {
      const defaultTasks = [
        { id: "task-1", content: "Welcome to your to-do app!", completed: false },
        { id: "task-2", content: "Add or edit tasks using the input below.", completed: false },
        { id: "task-3", content: "Drag tasks to reorder them.", completed: false },
      ];
      setTasks(defaultTasks);
      localStorage.setItem("todayTasks", JSON.stringify(defaultTasks));
    }
  }, []); // This useEffect only runs on initial mount

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("todayTasks", JSON.stringify(tasks));
    }
  }, [tasks]); // This useEffect runs every time tasks change

  // Add task function
  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (trimmed === "") return;

    const newId = `task-${Date.now()}`;
    const newEntry = { id: newId, content: trimmed, completed: false };

    setTasks((prev) => [...prev, newEntry]);
    setNewTask(""); // Reset input field
  };

  // Handle task content change (editable)
  const handleTaskContentChange = (id, event) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, content: event.target.value } : task
      )
    );
  };

  // Drag and drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTasks(reordered);
  };

  return (
    <div className="today-tasks-container">
      <h2>Planned Tasks</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="droppable-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-item ${snapshot.isDragging ? "dragging" : ""}`}
                    >
                      <input
                        type="text"
                        value={task.content}
                        onChange={(e) => handleTaskContentChange(task.id, e)}
                        className="task-input"
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {/* Dummy input to add task */}
              <div className="task-item dummy-task">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="task-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTask();
                    }
                  }}
                />
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodayTasks;
