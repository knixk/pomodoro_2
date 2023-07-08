import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [totalCycles, setTotalCycles] = useState(4);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);

  const POMODORO = 25 * 60,
    SHORT_BREAK = 5 * 60,
    LONG_BREAK = 10 * 60;

  useEffect(() => {
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (currentCycle < totalCycles) {
              setCurrentCycle((prevCycle) => prevCycle + 1);
              setTimeRemaining(breakTime);
            } else {
              setIsRunning(false);
              setCurrentCycle(1);
              setTimeRemaining(workTime);
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, currentCycle, totalCycles, workTime, breakTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentCycle(1);
    setTimeRemaining(workTime);
  };

  const handleCycleChange = (event) => {
    const newCycles = parseInt(event.target.value);
    setTotalCycles(newCycles);
    if (currentCycle > newCycles) {
      setCurrentCycle(newCycles);
    }
  };

  const selectMode = (e) => {
    resetTimer();
    const { name } = e.target;
    switch (name) {
      case "long":
        setTimeRemaining(LONG_BREAK);
        break;
      case "short":
        setTimeRemaining(SHORT_BREAK);
        break;
      case "pomodoro":
        setTimeRemaining(POMODORO);
        break;
      default:
        setTimeRemaining(0);
    }
  };

  const formatTime = (time) => {
    if (time <= 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <h2>Task #2: Pomodoro App</h2>
      <div className="btn-container">
        <button onClick={selectMode} name="pomodoro" className="btn blue">
          Pomodoro
        </button>
        <button onClick={selectMode} name="short" className="btn blue">
          Short Break
        </button>
        <button onClick={selectMode} name="long" className="btn blue">
          Long Break
        </button>
      </div>

      <div className="timer-container">
        <span className={workTime < 300 ? "timer break" : "timer"}>
          {formatTime(timeRemaining)}
        </span>
        <h3>
          Cycle <span>{currentCycle}</span> of <span>{totalCycles}</span>
        </h3>
      </div>

      <ul className="li-container">
        <input
          value={totalCycles}
          onChange={handleCycleChange}
          className="btn"
          type="number"
          placeholder="cycles: 1 - 5"
          id="cycles"
          name="cycles"
          min="0"
          max="10"
        />
        <li onClick={startTimer} className="btn green">
          Start
        </li>
        <li onClick={stopTimer} className="btn red">
          Stop
        </li>
        <li onClick={resetTimer} name="reset" className="btn yellow">
          Reset
        </li>
      </ul>
    </div>
  );
}

// var seconds = 0;
// var interval;
// function pomodoro(mins) {
//   seconds = mins * 60 || 0;
//   interval = setInterval(function () {
//     seconds--;
//     if (!seconds) {
//       clearInterval(interval);
//       alert("🚨 It is Cool 😎. I wish you could share ");
//     }
//   }, 1000);
// }

// i wrote this
// function start() {
//   var myInterval = setInterval(() => {
//     if (timer <= 0) {
//       clearInterval(myInterval);
//       setTimer(0);
//     }
//     setTimer((timer) => timer - 1);
//     console.log(timer);
//   }, 1000);
// }
