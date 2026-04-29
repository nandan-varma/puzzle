'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Speed() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const randomHoleRef = useRef(() => {
    const hole = Math.floor(Math.random() * 9);
    setCurrent(hole);
  });

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => randomHoleRef.current(), 800);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft === 0) setGameOver(true);
  }, [timeLeft]);

  const hit = (id: number) => {
    if (id === current) {
      setScore((p) => p + 1);
      setCurrent(null);
    }
  };

  const replay = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>Whack-a-Mole</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>Click the green targets!</p>

      <div style={{ marginBottom: '1rem' }}>
        Score: <strong>{score}</strong> | Time: <strong>{timeLeft}s</strong>
      </div>

      {gameOver && (
        <div style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
          Game Over! Final Score: {score}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '2rem' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={() => hit(i)}
            style={{
              aspectRatio: '1',
              backgroundColor: current === i ? '#27ae60' : '#ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <button onClick={replay} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
        {gameOver ? 'Play Again' : 'Restart'}
      </button>

      <Link href="/">Back to Home</Link>
    </div>
  );
}