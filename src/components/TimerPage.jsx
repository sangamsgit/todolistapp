import React, { useState, useEffect, useRef } from 'react';
import './TimerPage.css'

const App = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const calculateTotalSeconds = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const updateTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    setTime(totalSeconds);
  };

  const handleQuickStart = (durationInMinutes) => {
    const totalSeconds = durationInMinutes * 60;
    setInitialTime(totalSeconds);
    updateTime(totalSeconds);
    setIsRunning(true);
  };



  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev - 1;
          updateTime(newTime);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, time]);

  const handleStart = () => {
    const totalSeconds = calculateTotalSeconds();
    if (totalSeconds > 0) {
      setInitialTime(totalSeconds);
      setTime(totalSeconds);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    updateTime(initialTime);
  };

  const handleInputChange = (setter) => (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 59) {
      setter(value);
      if (!isRunning) {
        const totalSeconds = calculateTotalSeconds();
        setInitialTime(totalSeconds);
        setTime(totalSeconds);
      }
    }
  };

  const progress = initialTime > 0 ? ((initialTime - time) / initialTime) * 100 : 0;

  return (
    <div className="app-container">
      <div className="timer-container">
        <h1 className="timer-title">TIMER</h1>
        <div className="time-inputs">
          <div>
            <input
              type="number"
              value={hours.toString().padStart(2, '0')}
              onChange={handleInputChange(setHours)}
              className="time-input"
              disabled={isRunning}
            />
            <p>Hours</p>
          </div>
          <div>
            <input
              type="number"
              value={minutes.toString().padStart(2, '0')}
              onChange={handleInputChange(setMinutes)}
              className="time-input"
              disabled={isRunning}
            />
            <p>Minutes</p>
          </div>
          <div>
            <input
              type="number"
              value={seconds.toString().padStart(2, '0')}
              onChange={handleInputChange(setSeconds)}
              className="time-input"
              disabled={isRunning}
            />
            <p>Seconds</p>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={handleStart}
            disabled={isRunning || time === 0}
            className="start-btn"
          >
            START
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="pause-btn"
          >
            PAUSE
          </button>
          <button
            onClick={handleReset}
            disabled={time === initialTime && !isRunning}
            className="reset-btn"
          >
            RESET
          </button>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
          ></div>
        </div>
        <div className="quick-start-buttons">
            <button onClick={() => handleQuickStart(2)} className="quick-btn">
              Start 2 Min Timer
            </button>
            <button onClick={() => handleQuickStart(5)} className="quick-btn">
              Start 5 Min Timer
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;