'use client';

import Link from 'next/link';
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

const validWords: string[] = [
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
    if (selectedCells.length === 0) {
      return;
    }
    const selectedWord = selectedCells
      .map(([row, col]) => {
        const rowData = castleWords[row];
        return rowData?.[col] ?? '';
      })
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
    const letter = castleWords[row]?.[col] ?? '';
    return (
      <td
        key={`${row}+${col}`}
        className={`cell ${isSelected ? 'selected' : ''}`}
        onMouseDown={() => handleMouseDown(row, col)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={handleMouseUp}
      >
        {letter}
      </td>
    );
  };

  return (
    <>
      <h1>Word Search</h1>
      <p>Drag to select hidden words</p>
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
      <Link href="/">Back to Home</Link>
    </>
  );
}
