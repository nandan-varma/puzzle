import React from 'react';

const Peg = ({ name, disks }) => {
  if (disks.length === 0) {
    return null;
  }

  return (
    <div className="peg">
      <h2>{name}</h2>
      <ul>
        {disks.map((disk, i) => (
          <li key={i} className="disk" data-size={disk}>
            {disk}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Peg;