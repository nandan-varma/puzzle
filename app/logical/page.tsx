'use client';

import { useState } from 'react';

type Pole = number[];

export default function Logical() {
  const [blobs, setBlobs] = useState<Pole[]>([[3, 2, 1], [], []]);
  const [selectedBlob, setSelectedBlob] = useState<number | null>(null);

  const handlePoleClick = (poleIndex: number) => {
    const newBlobs = [...blobs];
    if (selectedBlob === null) {
      const topBlob = newBlobs[poleIndex].pop();
      setSelectedBlob(topBlob ?? null);
    } else {
      const topBlob = newBlobs[poleIndex][newBlobs[poleIndex].length - 1];
      if (topBlob === undefined || selectedBlob < topBlob) {
        newBlobs[poleIndex].push(selectedBlob);
        setSelectedBlob(null);
      }
    }
    setBlobs([...newBlobs]);
  };

  return (
    <div>
      {blobs.map((poleBlobs, poleIndex) => (
        <div
          key={poleIndex}
          className="pole"
          role="button"
          tabIndex={0}
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
  );
}