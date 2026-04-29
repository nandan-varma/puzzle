'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const castleWords = [
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

const validWords = [
  'CASTLE',
  'KNIGHT',
  'CROWN',
  'ROYALTY',
  'ARCHERY',
  'GUARDS',
  'MOAT',
  'MONARCHY',
  'THRONE',
];

type CellPosition = [number, number];

export default function Analytical() {
  const router = useRouter();
  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const handleMouseDown = (row: number, col: number) => {
    setSelectedCells([[row, col]]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (selectedCells.length > 0) {
      setSelectedCells([...selectedCells, [row, col]]);
    }
  };

  const handleMouseUp = () => {
    const selectedWord = selectedCells
      .map(([row, col]) => castleWords[row][col])
      .join('');
    if (validWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
    }
    setSelectedCells([]);
  };

  useEffect(() => {
    if (foundWords.length === 5) {
      router.push('/memory');
    }
  }, [foundWords, router]);

  const renderCell = (row: number, col: number) => {
    const isSelected = selectedCells.some(([r, c]) => r === row && c === col);
    return (
      <td
        key={`${row}+${col}`}
        className={`cell ${isSelected ? 'selected' : ''}`}
        role="button"
        tabIndex={0}
        onMouseDown={() => handleMouseDown(row, col)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={handleMouseUp}
      >
        {castleWords[row][col]}
      </td>
    );
  };

  return (
    <>
      <table>
        <tbody>
          {Array.from({ length: 10 }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: 10 }).map((_, col) => renderCell(row, col))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>Found words: {foundWords.join(', ')}</div>
    </>
  );
}
