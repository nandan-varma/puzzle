'use client';

import { useEffect, useState } from 'react';

export default function Pingpong() {
  const [leftPlayerPosition, setLeftPlayerPosition] = useState(0);
  const [rightPlayerPosition, setRightPlayerPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          setLeftPlayerPosition((prev) => prev - 10);
          break;
        case 's':
          setLeftPlayerPosition((prev) => prev + 10);
          break;
        case 'ArrowUp':
          setRightPlayerPosition((prev) => prev - 10);
          break;
        case 'ArrowDown':
          setRightPlayerPosition((prev) => prev + 10);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = () => {
      setLeftPlayerPosition(0);
      setRightPlayerPosition(0);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'relative',
          height: '400px',
          width: '600px',
          border: '1px solid black',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: `${leftPlayerPosition}px`,
            width: '10px',
            height: '80px',
            backgroundColor: 'blue',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: `${rightPlayerPosition}px`,
            width: '10px',
            height: '80px',
            backgroundColor: 'red',
          }}
        />
      </div>
    </div>
  );
}
