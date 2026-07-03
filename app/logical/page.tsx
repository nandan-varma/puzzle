'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Container } from '@/components/ui';

type Pole = number[];

export default function Logical() {
  const [poles, setPoles] = useState<Pole[]>([[3, 2, 1], [], []]);
  const [selected, setSelected] = useState<{
    poleIndex: number;
    value: number;
  } | null>(null);

  const handleClick = (poleIndex: number) => {
    setPoles((prevPoles) => {
      const newPoles = prevPoles.map((p) => [...p]);
      const clickedPole = newPoles[poleIndex];

      if (!clickedPole) return prevPoles;

      if (selected === null) {
        if (clickedPole.length === 0) return prevPoles;
        const disk = clickedPole.pop();
        if (disk !== undefined) {
          setSelected({ poleIndex, value: disk });
        }
      } else {
        const topDisk = clickedPole[clickedPole.length - 1];
        if (
          clickedPole.length === 0 ||
          (topDisk !== undefined && selected.value < topDisk)
        ) {
          clickedPole.push(selected.value);
          setSelected(null);
        }
      }

      return [...newPoles];
    });
  };

  const reset = () => {
    setPoles([[3, 2, 1], [], []]);
    setSelected(null);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Tower of Hanoi</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Tap a pole to pick up disk, tap another to place
      </p>

      {selected && (
        <p
          style={{ marginBottom: '1rem', color: '#8b5cf6', fontWeight: 'bold' }}
        >
          Holding disk: {selected.value}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1rem, 5vw, 2rem)',
          marginBottom: '2rem',
        }}
      >
        {poles.map((pole, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(i)}
            style={{
              width: 'clamp(60px, 20vw, 80px)',
              minHeight: 'clamp(80px, 25vw, 120px)',
              border: `2px solid ${selected?.poleIndex === i ? '#6366f1' : '#8b5cf6'}`,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0.5rem',
              cursor: 'pointer',
              backgroundColor: '#1f2937',
            }}
          >
            {pole.map((v, j) => (
              <div
                key={j}
                style={{
                  height: 'clamp(12px, 3vw, 20px)',
                  backgroundColor:
                    selected?.value === v ? '#6366f1' : '#8b5cf6',
                  borderRadius: '4px',
                  margin: '2px auto',
                  width: `${v * 20}%`,
                  minWidth: '20px',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <Button
        onClick={reset}
        variant="secondary"
        style={{ marginRight: '1rem' }}
      >
        Reset
      </Button>
      <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Container>
  );
}
