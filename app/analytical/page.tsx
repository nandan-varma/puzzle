'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';

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

export default function Analytical() {
  const [selected, setSelected] = useState<[number, number][]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleStart = (r: number, c: number) => {
    setSelected([[r, c]]);
    setIsSelecting(true);
  };

  const handleMove = (r: number, c: number) => {
    if (!isSelecting) return;
    const last = selected[selected.length - 1];
    if (!last) return;
    const [lr, lc] = last;
    const isAdjacent = Math.abs(r - lr) <= 1 && Math.abs(c - lc) <= 1;
    if (isAdjacent && !selected.some(([sr, sc]) => sr === r && sc === c)) {
      setSelected([...selected, [r, c]]);
    }
  };

  const handleEnd = () => {
    if (selected.length === 0) return;
    const word = selected.map(([r, c]) => grid[r]?.[c] ?? '').join('');
    if (words.includes(word) && !found.includes(word)) {
      setFound([...found, word]);
    }
    setSelected([]);
    setIsSelecting(false);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Word Search</h1>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
        Drag to select hidden words
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '1px',
          marginBottom: '1rem',
          maxWidth: '350px',
          userSelect: 'none',
        }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const isSelected = selected.some(([sr, sc]) => sr === r && sc === c);
            return (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => handleStart(r, c)}
                onMouseEnter={() => handleMove(r, c)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                style={{
                  aspectRatio: '1',
                  backgroundColor: isSelected ? '#3498db' : '#fff',
                  color: isSelected ? '#fff' : '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.625rem, 3vw, 0.875rem)',
                  fontWeight: 'bold',
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>
        Found ({found.length}/5): {found.join(', ') || 'None yet'}
      </p>

      {found.length === 5 && (
        <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '1rem' }}>
          🎉 All words found! Great job!
        </p>
      )}

      <Button
        onClick={() => {
          setFound([]);
          setSelected([]);
        }}
        variant="secondary"
        style={{ marginRight: '0.5rem' }}
      >
        Reset
      </Button>

      <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Container>
  );
}