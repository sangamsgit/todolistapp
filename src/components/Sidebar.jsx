import React from 'react';
import './Sidebar.css'; // Make sure the sidebar CSS is imported
import { ListTodo, CalendarDays, Timer, NotebookPen, BadgeCheck } from "lucide-react";

const Sidebar = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">My To-Do List</div>

      {/* Sidebar Items */}
      <div
        className={`sidebar-item ${selectedSection === 'To-Do List' ? 'active' : ''}`}
        onClick={() => setSelectedSection('To-Do List')}
      >
        <ListTodo />
        <span>To-Do List</span>
      </div>

      <div
        className={`sidebar-item ${selectedSection === 'Habit Tracker' ? 'active' : ''}`}
        onClick={() => setSelectedSection('Habit Tracker')}
      >
        <BadgeCheck />
        <span>Habit Tracker</span>
      </div>

      <div
        className={`sidebar-item ${selectedSection === 'Timer' ? 'active' : ''}`}
        onClick={() => setSelectedSection('Timer')}
      >
        <Timer />
        <span>Timer</span>
      </div>

      <div
        className={`sidebar-item ${selectedSection === 'Calendar' ? 'active' : ''}`}
        onClick={() => setSelectedSection('Calendar')}
      >
        <CalendarDays />
        <span>Calendar</span>
      </div>

      <div
        className={`sidebar-item ${selectedSection === 'Notes' ? 'active' : ''}`}
        onClick={() => setSelectedSection('Notes')}
      >
        <NotebookPen />
        <span>Notes</span>
      </div>
    </div>
  );
};

export default Sidebar;
