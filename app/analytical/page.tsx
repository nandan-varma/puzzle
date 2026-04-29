'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const router = useRouter();
  const [selected, setSelected] = useState<Pos[]>([]);
  const [found, setFound] = useState<string[]>([]);

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

  useEffect(() => {
    if (found.length === 5) router.push('/memory');
  }, [found, router]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>Word Search</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>Drag to select hidden words</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px', marginBottom: '1rem' }}>
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
                  width: '28px',
                  height: '28px',
                  backgroundColor: isSelected ? '#3498db' : '#fff',
                  color: isSelected ? '#fff' : '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <p>Found: {found.join(', ') || 'None yet'}</p>

      <Link href="/" style={{ padding: '0.5rem 1rem', display: 'inline-block' }}>
        Back to Home
      </Link>
    </div>
  );
}