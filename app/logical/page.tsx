'use client';

import Link from 'next/link';
import { useState } from 'react';

type Pole = number[];

export default function Logical() {
  const [blobs, setBlobs] = useState<Pole[]>([[3, 2, 1], [], []]);
  const [selectedBlob, setSelectedBlob] = useState<number | null>(null);

  const handlePoleClick = (poleIndex: number) => {
    const newBlobs = [...blobs];
    const pole = newBlobs[poleIndex];

    if (pole === undefined) {
      return;
    }

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
    <div>
      <h1>Tower of Hanoi</h1>
      <p>Move all disks to the right pole</p>
      <div>
        {blobs.map((poleBlobs, poleIndex) => (
          <div
            key={poleIndex}
            role="button"
            tabIndex={0}
            className="pole"
            onClick={() => handlePoleClick(poleIndex)}
          >
            {poleBlobs.map((blobSize) => (
              <div key={blobSize} className="blob" data-size={blobSize}>
                {blobSize}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
