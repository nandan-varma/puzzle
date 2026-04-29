'use client';

import { useEffect, useState } from 'react';

export default function Speed() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (gameOver) {
      return;
    }
    const timer = setInterval(() => {
      randomHole();
    }, 800);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  const randomHole = () => {
    const hole = Math.floor(Math.random() * 9);
    setCurrent(hole);
  };

  const hit = (id: number) => {
    if (id === current) {
      setScore((prev) => prev + 1);
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
          <button type="button" onClick={replay}>
            Replay
          </button>
        </>
      )}
      <table>
        <tbody>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 3 }).map((_, colIndex) => {
                const id = rowIndex * 3 + colIndex;
                return (
                  <td
                    key={id}
                    role="button"
                    tabIndex={0}
                    onClick={() => hit(id)}
                    style={{
                      backgroundColor: id === current ? 'green' : 'white',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
