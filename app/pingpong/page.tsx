'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Pingpong() {
  const [leftY, setLeftY] = useState(150);
  const [rightY, setRightY] = useState(150);
  const [ball, setBall] = useState<Ball>({ x: 300, y: 200, vx: 4, vy: 2 });
  const [score, setScore] = useState({ left: 0, right: 0 });
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  // Game loop
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        const width = 600;
        const height = 400;

        // Move ball
        x += vx;
        y += vy;

        // Bounce off top/bottom walls
        if (y <= 0 || y >= height - 20) {
          vy = -vy;
        }

        // Paddle collision - left
        if (x <= 30 && y >= leftY && y <= leftY + 80) {
          vx = Math.abs(vx) * 1.1;
          setScore((s) => ({ ...s, left: s.left + 1 }));
        }

        // Paddle collision - right
        if (x >= width - 30 && y >= rightY && y <= rightY + 80) {
          vx = -Math.abs(vx) * 1.1;
          setScore((s) => ({ ...s, right: s.right + 1 }));
        }

        // Score - ball went off screen
        if (x < 0 || x > width) {
          // Reset ball
          return { x: 300, y: 200, vx: x < 0 ? 4 : -4, vy: 2 };
        }

        return { x, y, vx, vy };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameOver, leftY, rightY]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W') setLeftY((p) => Math.max(0, p - 15));
      if (e.key === 's' || e.key === 'S')
        setLeftY((p) => Math.min(320, p + 15));
      if (e.key === 'ArrowUp') setRightY((p) => Math.max(0, p - 15));
      if (e.key === 'ArrowDown') setRightY((p) => Math.min(320, p + 15));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simple touch controls for mobile
  const handleTouch = (side: 'left' | 'right', direction: 'up' | 'down') => {
    const move = direction === 'up' ? -15 : 15;
    if (side === 'left') {
      setLeftY((p) => Math.max(0, Math.min(320, p + move)));
    } else {
      setRightY((p) => Math.max(0, Math.min(320, p + move)));
    }
  };

  const restart = () => {
    setBall({ x: 300, y: 200, vx: 4, vy: 2 });
    setScore({ left: 0, right: 0 });
    setGameOver(false);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Ping Pong</h1>
      <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
        Desktop: W/S (left) | Arrow keys (right)
      </p>

      <div style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
        <span style={{ color: '#3498db' }}>You: {score.left}</span>
        <span style={{ margin: '0 1rem' }}>-</span>
        <span style={{ color: '#e74c3c' }}>CPU: {score.right}</span>
      </div>

      {/* Mobile controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
        }}
      >
        <button
          type="button"
          onClick={() => handleTouch('left', 'up')}
          style={{ padding: '0.5rem 1rem' }}
        >
          ↑ Left
        </button>
        <button
          type="button"
          onClick={() => handleTouch('right', 'up')}
          style={{ padding: '0.5rem 1rem' }}
        >
          ↑ Right
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <button
          type="button"
          onClick={() => handleTouch('left', 'down')}
          style={{ padding: '0.5rem 1rem' }}
        >
          ↓ Left
        </button>
        <button
          type="button"
          onClick={() => handleTouch('right', 'down')}
          style={{ padding: '0.5rem 1rem' }}
        >
          ↓ Right
        </button>
      </div>

      <div
        ref={gameRef}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '400px',
          border: '2px solid #333',
          position: 'relative',
          margin: '0 auto',
          backgroundColor: '#1f2937',
          overflow: 'hidden',
        }}
      >
        {/* Center line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '2px',
            height: '100%',
            backgroundColor: '#4b5563',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Ball */}
        <div
          style={{
            position: 'absolute',
            left: ball.x,
            top: ball.y,
            width: '16px',
            height: '16px',
            backgroundColor: '#fbbf24',
            borderRadius: '50%',
          }}
        />

        {/* Left paddle (Player) */}
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: leftY,
            width: '12px',
            height: '80px',
            backgroundColor: '#3498db',
            borderRadius: '4px',
          }}
        />

        {/* Right paddle (CPU) */}
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: rightY,
            width: '12px',
            height: '80px',
            backgroundColor: '#e74c3c',
            borderRadius: '4px',
          }}
        />
      </div>

      <button
        type="button"
        onClick={restart}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Restart
      </button>

      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginLeft: '1rem',
          marginTop: '1rem',
          color: '#6b7280',
        }}
      >
        Back to Home
      </Link>
    </Container>
  );
}
