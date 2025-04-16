import React, { useEffect, useState } from 'react';
import './HabitTracker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faTasks,
  faStickyNote,
  faStopwatch,
  faCalendar,
  faChartBar,
  faCalendarAlt,
  faChevronDown,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const HabitTracker = () => {
  const [dateRange, setDateRange] = useState('May 03 - May 18');
  const [timeRange, setTimeRange] = useState('24h');
  const [goalValues, setGoalValues] = useState(Array(6).fill(0));
  const [achievedValues, setAchievedValues] = useState(Array(6).fill(0));
  const [habitGrid, setHabitGrid] = useState([
    ['partial', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'partial', 'completed'],
    ['partial', 'partial', 'completed', 'completed', 'completed', 'completed', 'completed', 'partial', 'completed', 'special'],
    ['completed', 'completed', 'completed', 'completed', 'partial', 'completed', 'partial', 'partial', 'completed', 'completed'],
    ['completed', 'completed', 'completed', 'partial', 'completed', 'completed', 'partial', 'partial', 'partial', 'completed'],
    ['completed', 'partial', 'completed', 'completed', 'partial', 'completed', 'completed', 'partial', 'partial', 'special'],
    ['completed', 'completed', 'completed', 'completed', 'partial', 'completed', 'partial', 'completed', 'completed', 'completed']
  ]);

  const cycleOptions = (current, options) => {
    const index = options.indexOf(current);
    return options[(index + 1) % options.length];
  };

  const handleHabitClick = (rowIdx, cellIdx) => {
    setHabitGrid(prev => {
      const updated = [...prev];
      const current = updated[rowIdx][cellIdx];
      const states = ['', 'completed', 'partial', 'special'];
      const next = cycleOptions(current || '', states);
      updated[rowIdx][cellIdx] = next;
      return updated;
    });
  };

  const calculateProgress = () => {
    const total = habitGrid.flat().length;
    const filled = habitGrid.flat().filter(s => s).length;
    return Math.round((filled / total) * 100);
  };

  const handleGoalClick = (index) => {
    const newValue = prompt('Enter goal value:', goalValues[index]);
    if (newValue !== null && !isNaN(newValue)) {
      const updated = [...goalValues];
      updated[index] = Number(newValue);
      setGoalValues(updated);
    }
  };

  const handleAchievedClick = (index) => {
    const newValue = prompt('Enter achieved value:', achievedValues[index]);
    if (newValue !== null && !isNaN(newValue)) {
      const updated = [...achievedValues];
      updated[index] = Number(newValue);
      setAchievedValues(updated);
    }
  };

  const progress = calculateProgress();
  const dates = ['03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', '11/01', '12/01'];
  const habitIcons = ['🏃', '💧', '💪', '😴', '🐪', '🥦'];

  return (
    <div className="habit-tracker-container">
      <div className="main-content">
        <div className="header">
          <div className="date-selector" onClick={() => setDateRange(cycleOptions(dateRange, ['May 01 - Jun 01', 'Jun 01 - Jun 15', 'Jun 15 - Jun 30']))}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{dateRange}</span>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>
          <div className="time-selector" onClick={() => setTimeRange(cycleOptions(timeRange, ['24h', '12h', 'Week', 'Month']))}>
            <FontAwesomeIcon icon={faClock} />
            <span>{timeRange}</span>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>
        </div>

        <div className="habit-grid">
          <div className="grid-header">
            <div className="icon-cell"></div>
            {dates.map(date => <div className="date-cell" key={date}>{date}</div>)}
          </div>
          {habitGrid.map((row, rowIndex) => (
            <div className="grid-row" key={rowIndex}>
              <div className="icon-cell">{habitIcons[rowIndex]}</div>
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`habit-cell ${cell}`}
                  onClick={() => handleHabitClick(rowIndex, cellIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>

        <div className="summary-section">
          <div className="habits-summary">
            <div className="habits-icons">
              {habitIcons.map((icon, i) => <div className="habit-icon" key={i}>{icon}</div>)}
            </div>
            <div className="goal-row">
              <span>Goal</span>
              {goalValues.map((val, i) => (
                <div key={i} className="goal-cell" onClick={() => handleGoalClick(i)}>{val}</div>
              ))}
            </div>
            <div className="achieved-row">
              <span>Achieved</span>
              {achievedValues.map((val, i) => (
                <div key={i} className="achieved-cell" onClick={() => handleAchievedClick(i)}>{val}</div>
              ))}
            </div>
          </div>  
          <div className='progress-box-wrapper'>
          <div className="progress-box">
            <div className="progress-title">Not done</div>
            <div className="progress-circle not-done">
              <svg viewBox="0 0 100 100">
                <circle className="background" cx="50" cy="50" r="40"></circle>
                <circle className="progress" cx="50" cy="50" r="40"
                  strokeDasharray="251.2"
                  strokeDashoffset={(251.2 - (progress / 100) * 251.2)}
                ></circle>
              </svg>
              <div className="progress-text">{progress}%</div>
            </div>
          </div>

          <div className="progress-box">
            <div className="progress-title">Daily progress</div>
            <div className="progress-circle daily">
              <svg viewBox="0 0 100 100">
                <circle className="background" cx="50" cy="50" r="40"></circle>
                <circle className="progress" cx="50" cy="50" r="40"
                  strokeDasharray="251.2"
                  strokeDashoffset={(251.2 - (progress / 100) * 251.2)}
                ></circle>
              </svg>
              <div className="progress-text">{progress}%</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
