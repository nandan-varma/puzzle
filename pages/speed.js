import React, { useState, useEffect } from 'react';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let timer = setInterval(() => {
      randomHole();
    }, 800);
    if (gameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (gameOver) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  const randomHole = () => {
    let hole = Math.floor(Math.random() * 9);
    setCurrent(hole);
  };

  const hit = (id) => {
    if (id === current) {
      setScore((prevScore) => prevScore + 1);
      setCurrent(null);
    }
  };

  const replay = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <div>
      <h1>Whack-a-Mole</h1>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}</h2>
      {gameOver && (
        <>
          <h2>Game Over</h2>
          <button onClick={replay}>Replay</button>
        </>
      )}
      <table>
        <tbody>
          {[...Array(3)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(3)].map((_, colIndex) => {
                let id = rowIndex * 3 + colIndex;
                return (
                  <td
                    key={id}
                    onClick={() => hit(id)}
                    style={{
                      backgroundColor: id === current ? 'green' : 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WhackAMole;