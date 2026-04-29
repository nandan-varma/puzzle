'use client';

import { useEffect, useState } from 'react';
import { Button, Container } from '@/components/ui';

export default function Speed() {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(0);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState(10);

  useEffect(() => {
    const moveTarget = () => setTarget(Math.floor(Math.random() * 9));
    if (over) return;
    const id1 = setInterval(moveTarget, 800);
    return () => clearInterval(id1);
  }, [over]);

  useEffect(() => {
    if (over) return;
    const id2 = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id2);
  }, [over]);

  useEffect(() => {
    if (time <= 0) setOver(true);
  }, [time]);

  const hit = (i: number) => {
    if (i === target) {
      setScore((s) => s + 1);
      setTarget(-1);
    }
  };

  const restart = () => {
    setScore(0);
    setTime(10);
    setOver(false);
    setTarget(Math.floor(Math.random() * 9));
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Whack-a-Mole</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Click the green targets!
      </p>

      <p style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        Score: <strong>{score}</strong>
        <span style={{ margin: '0 1rem' }}>|</span>
        Time: <strong>{time}s</strong>
      </p>

      {over && (
        <p style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#10b981' }}>
          Game Over! Final Score: {score}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
          maxWidth: '300px',
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={() => hit(i)}
            style={{
              aspectRatio: '1',
              backgroundColor: i === target ? '#10b981' : '#e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      <Button onClick={restart} variant={over ? 'primary' : 'secondary'}>
        {over ? 'Play Again' : 'Restart'}
      </Button>
      <a href="/" style={{ marginLeft: '1rem', color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </a>
    </Container>
  );
}