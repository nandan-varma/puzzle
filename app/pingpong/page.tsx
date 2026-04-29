'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Pingpong() {
  const [leftY, setLeftY] = useState(160);
  const [rightY, setRightY] = useState(160);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') setLeftY((p) => Math.max(0, p - 20));
      if (e.key === 's') setLeftY((p) => Math.min(320, p + 20));
      if (e.key === 'ArrowUp') setRightY((p) => Math.max(0, p - 20));
      if (e.key === 'ArrowDown') setRightY((p) => Math.min(320, p + 20));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Ping Pong</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>Left: W/S keys | Right: Arrow Up/Down</p>

      <div
        style={{
          width: '600px',
          height: '400px',
          border: '2px solid #333',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: leftY,
            width: '10px',
            height: '80px',
            backgroundColor: '#3498db',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: rightY,
            width: '10px',
            height: '80px',
            backgroundColor: '#e74c3c',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '295px',
            top: '0',
            width: '2px',
            height: '400px',
            backgroundColor: '#ccc',
          }}
        />
      </div>

      <Link href="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Back to Home
      </Link>
    </div>
  );
}