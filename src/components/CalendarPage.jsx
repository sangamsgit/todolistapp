import React, { useState } from 'react';
import './CalendarPage.css';

const Calendar = ({ currentDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(currentDate));
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="days-row">
        {days.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const rows = [];
    let days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        days.push(
          <div
            key={day}
            className={`day-cell ${
              day.getMonth() !== currentMonth.getMonth() ? 'disabled' : ''
            } ${
              day.toDateString() === currentDate.toDateString() ? 'selected' : ''
            }`}
            onClick={() => onDateSelect(cloneDay)}
          >
            <span>{day.getDate()}</span>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(<div key={day} className="days-row">{days}</div>);
      days = [];
    }

    return <div className="days-grid">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

const Schedule = ({ selectedDate, tasks, onAddTask, onDeleteTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTime, setSelectedTime] = useState('09:00');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedTime(task.time);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      time: formData.get('time'),
      title: formData.get('title'),
      description: formData.get('description')
    };

    onAddTask(task);
    setShowForm(false);
  };

  const dayTasks = tasks.filter(task => 
    new Date(task.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="schedule">
      <h2>{formatDate(selectedDate)}</h2>
      
      <div className="time-slots">
        {timeSlots.map(time => {
          const taskForSlot = dayTasks.find(task => task.time === time);
          return (
            <div key={time} className="time-slot" onClick={() => handleTimeSlotClick(time)}>
              <div className="time">{time}</div>
              <div className="task">
                {taskForSlot ? (
                  <div className="task-item" onClick={(e) => {
                    e.stopPropagation();
                    handleEditTask(taskForSlot);
                  }}>
                    <strong>{taskForSlot.title}</strong>
                    <p>{taskForSlot.description}</p>
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(taskForSlot.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="task-form-modal">
          <div className="task-form-container">
            <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Time:</label>
                <select name="time" defaultValue={selectedTime}>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  defaultValue={editingTask?.title || ''}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea 
                  name="description" 
                  defaultValue={editingTask?.description || ''}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = (task) => {
    const taskWithDate = { ...task, date: selectedDate };
    if (task.id && tasks.some(t => t.id === task.id)) {
      setTasks(tasks.map(t => t.id === task.id ? taskWithDate : t));
    } else {
      setTasks([...tasks, taskWithDate]);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app">
      <div className="main-calendar-container">
        <div className="calendar-container">
          <Calendar currentDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
        <div className="schedule-container">
          <Schedule 
            selectedDate={selectedDate} 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;