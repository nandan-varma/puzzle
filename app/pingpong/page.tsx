'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';

export default function Pingpong() {
  const [leftY, setLeftY] = useState(160);
  const [rightY, setRightY] = useState(160);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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

  const isMobile = windowWidth < 640;
  const width = isMobile ? windowWidth - 40 : 600;
  const height = Math.min(width * 0.67, windowHeight * 0.5);
  const paddleWidth = Math.max(8, width * 0.015);
  const paddleHeight = Math.max(60, height * 0.2);

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Ping Pong</h1>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        Left: W/S keys | Right: Arrow Up/Down
      </p>

      <div
        style={{
          width: width,
          height: height,
          border: '2px solid #333',
          position: 'relative',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: leftY,
            width: paddleWidth,
            height: paddleHeight,
            backgroundColor: '#3498db',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: rightY,
            width: paddleWidth,
            height: paddleHeight,
            backgroundColor: '#e74c3c',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            width: '2px',
            height: '100%',
            backgroundColor: '#ccc',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      <Link href="/" style={{ display: 'inline-block', marginTop: '1rem', color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Container>
  );
}