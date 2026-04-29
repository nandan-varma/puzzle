'use client';

import { useState } from 'react';
import Link from 'next/link';

type Pole = number[];

export default function Logical() {
  const [blobs, setBlobs] = useState<Pole[]>([[3, 2, 1], [], []]);
  const [selectedBlob, setSelectedBlob] = useState<number | null>(null);

  const handlePoleClick = (poleIndex: number) => {
    const newBlobs = [...blobs];
    const pole = newBlobs[poleIndex];
    if (pole === undefined) return;

    if (selectedBlob === null) {
      const topBlob = pole.pop();
      setSelectedBlob(topBlob ?? null);
    } else {
      const topBlob = pole[pole.length - 1];
      if (topBlob === undefined || selectedBlob < topBlob) {
        pole.push(selectedBlob);
        setSelectedBlob(null);
      }
    }
    setBlobs([...newBlobs]);
  };

  const reset = () => {
    setBlobs([[3, 2, 1], [], []]);
    setSelectedBlob(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>Tower of Hanoi</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>Move all disks to the right pole</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {blobs.map((poleBlobs, poleIndex) => (
          <div
            key={poleIndex}
            onClick={() => handlePoleClick(poleIndex)}
            style={{
              width: '80px',
              minHeight: '120px',
              border: '2px solid #9b59b6',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0.25rem',
              cursor: 'pointer',
            }}
          >
            {poleBlobs.map((blobSize, i) => (
              <div
                key={i}
                style={{
                  height: '20px',
                  backgroundColor: '#e74c3c',
                  borderRadius: '2px',
                  margin: '2px 0',
                  width: `${blobSize * 20}px`,
                  alignSelf: 'center',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={reset} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
        Reset
      </button>
      <Link href="/">Back to Home</Link>
    </div>
  );
}