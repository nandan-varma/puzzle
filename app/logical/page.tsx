'use client';

import { useState } from 'react';
import { Button, Container } from '@/components/ui';

type Pole = number[];

export default function Logical() {
  const [poles, setPoles] = useState<Pole[]>([[3, 2, 1], [], []]);
  const [selected, setSelected] = useState<number | null>(null);

  const click = (i: number) => {
    const next = [...poles];
    const p = next[i];
    if (!p || p.length === 0) return;

    if (selected === null) {
      const pop = p.pop();
      setSelected(pop ?? null);
    } else {
      const top = p[p.length - 1];
      if (!top || selected < top) {
        p.push(selected);
        setSelected(null);
      }
    }
    setPoles([...next]);
  };

  const reset = () => {
    setPoles([[3, 2, 1], [], []]);
    setSelected(null);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '0.25rem' }}>Tower of Hanoi</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Move all disks to the right pole
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {poles.map((p, i) => (
          <div
            key={i}
            onClick={() => click(i)}
            style={{
              width: '80px',
              minHeight: '120px',
              border: '2px solid #8b5cf6',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {p.map((v, j) => (
              <div
                key={j}
                style={{
                  height: '20px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '4px',
                  margin: '2px auto',
                  width: `${v * 20}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <Button onClick={reset} variant="secondary" style={{ marginRight: '1rem' }}>
        Reset
      </Button>
      <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
        Back to Home
      </a>
    </Container>
  );
}