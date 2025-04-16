import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TodayTasks.css";

const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load from localStorage or default tasks
  useEffect(() => {
    const saved = localStorage.getItem("todayTasks");
    let loadedTasks = [];
  
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        loadedTasks = parsed;
      }
    } catch {
      // ignore parse errors, fallback to dummy below
    }
  
    if (loadedTasks.length === 0) {
      const defaultTasks = [
        { id: "task-1", content: "Welcome to your to-do app!", completed: false },
        { id: "task-2", content: "Add or edit tasks using the input below.", completed: false },
        { id: "task-3", content: "Click the circle to complete a task!", completed: false },
      ];
      loadedTasks = defaultTasks;
      localStorage.setItem("todayTasks", JSON.stringify(defaultTasks));
    }
  
    setTasks(loadedTasks);
  }, []);
  

  useEffect(() => {
    localStorage.setItem("todayTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (trimmed === "") return;

    const newId = `task-${Date.now()}`;
    setTasks(prev => [...prev, { id: newId, content: trimmed, completed: false }]);
    setNewTask("");
  };

  const handleTaskContentChange = (id, event) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, content: event.target.value } : task
      )
    );
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    const reordered = Array.from(activeTasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTasks([...reordered, ...completedTasks]);
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="today-tasks-container">
      <h2>Today's Tasks</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="droppable-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {activeTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-item ${snapshot.isDragging ? "dragging" : ""}`}
                    >
                      <span
                        className={`circle-checkbox ${task.completed ? "checked" : ""}`}
                        onClick={() => toggleComplete(task.id)}
                      ></span>
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

              {/* Input box to add task */}
              <div className="task-item dummy-task">
                <span className="circle-placeholder" />
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

      {/* Completed tasks block */}
      {completedTasks.length > 0 && (
        <div className="completed-tasks">
          <h3>Completed</h3>
          {completedTasks.map((task) => (
            <div key={task.id} className="task-item completed">
              <span
                className={`circle-checkbox ${task.completed ? "checked" : ""}`}
                onClick={() => toggleComplete(task.id)}
              ></span>
              <input
                type="text"
                value={task.content}
                onChange={(e) => handleTaskContentChange(task.id, e)}
                className="task-input completed-input"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
