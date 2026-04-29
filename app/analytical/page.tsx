'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';

const grid = [
  ['C', 'R', 'O', 'W', 'N', 'S', 'A', 'R', 'M', 'O'],
  ['H', 'R', 'O', 'Y', 'A', 'L', 'T', 'Y', 'T', 'R'],
  ['A', 'I', 'K', 'N', 'I', 'G', 'H', 'T', 'S', 'E'],
  ['L', 'L', 'C', 'A', 'S', 'T', 'L', 'E', 'S', 'P'],
  ['L', 'E', 'M', 'O', 'A', 'T', 'D', 'R', 'A', 'W'],
  ['E', 'B', 'R', 'I', 'D', 'G', 'E', 'S', 'P', 'E'],
  ['N', 'A', 'R', 'C', 'H', 'E', 'R', 'Y', 'S', 'A'],
  ['G', 'U', 'A', 'R', 'D', 'S', 'M', 'O', 'A', 'T'],
  ['E', 'M', 'O', 'N', 'A', 'R', 'C', 'H', 'Y', 'T'],
  ['S', 'T', 'H', 'R', 'O', 'N', 'E', 'P', 'S', 'A'],
];

const words = ['CASTLE', 'KNIGHT', 'CROWN', 'ROYALTY', 'ARCHERY', 'GUARDS', 'MOAT', 'MONARCHY', 'THRONE'];

type Pos = [number, number];

export default function Analytical() {
  const [selected, setSelected] = useState<Pos[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleDown = (r: number, c: number) => setSelected([[r, c]]);
  const handleEnter = (r: number, c: number) => {
    if (selected.length > 0) setSelected([...selected, [r, c]]);
  };
  const handleUp = () => {
    if (selected.length === 0) return;
    const word = selected.map(([r, c]) => grid[r]?.[c] ?? '').join('');
    if (words.includes(word) && !found.includes(word)) {
      setFound([...found, word]);
    }
    setSelected([]);
  };

  const isMobile = windowWidth < 500;
  const isSmall = windowWidth < 360;
  const cellSize = isSmall ? 24 : isMobile ? 28 : 32;

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Word Search</h1>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Drag to select hidden words</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '1px',
          marginBottom: '1rem',
          maxWidth: `${cellSize * 10 + 9}px`,
          fontSize: isSmall ? '0.625rem' : '0.75rem',
        }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = selected.some(([sr, sc]) => sr === r && sc === c);
            return (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => handleDown(r, c)}
                onMouseEnter={() => handleEnter(r, c)}
                onMouseUp={handleUp}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: isSelected ? '#3498db' : '#fff',
                  color: isSelected ? '#fff' : '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <p style={{ marginBottom: '1rem' }}>
        Found: {found.join(', ') || 'None yet'}
      </p>

      <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Container>
  );
}