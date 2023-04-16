import React, { useState } from 'react';

const TowerOfHanoi = () => {
  const [blobs, setBlobs] = useState([
    [3, 2, 1],
    [],
    []
  ]);
  const [selectedBlob, setSelectedBlob] = useState(null);

  const handlePoleClick = (poleIndex) => {
    if (selectedBlob === null) {
      const topBlob = blobs[poleIndex].pop();
      setSelectedBlob(topBlob);
    } else {
      const topBlob = blobs[poleIndex][blobs[poleIndex].length - 1];
      if (topBlob === undefined || selectedBlob < topBlob) {
        blobs[poleIndex].push(selectedBlob);
        setSelectedBlob(null);
      }
    }
    setBlobs([...blobs]);
  };

  return (
    <div>
      {blobs.map((poleBlobs, poleIndex) => (
        <div key={poleIndex} className="pole" onClick={() => handlePoleClick(poleIndex)}>
          {poleBlobs.map((blobSize) => (
            <div key={blobSize} className="blob" data-size={blobSize}>
              {blobSize}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TowerOfHanoi;