import { useEffect, useState } from 'react';

const PingPongGame = () => {
  const [leftPlayerPosition, setLeftPlayerPosition] = useState(0);
  const [rightPlayerPosition, setRightPlayerPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          setLeftPlayerPosition((prevPosition) => prevPosition - 10);
          break;
        case 's':
          setLeftPlayerPosition((prevPosition) => prevPosition + 10);
          break;
        case 'ArrowUp':
          setRightPlayerPosition((prevPosition) => prevPosition - 10);
          break;
        case 'ArrowDown':
          setRightPlayerPosition((prevPosition) => prevPosition + 10);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
        ></div>
        <div
          style={{
            position: 'absolute',
            right: '10px',
            top: `${rightPlayerPosition}px`,
            width: '10px',
            height: '80px',
            backgroundColor: 'red',
          }}
        ></div>
        {/* Add the ping pong ball or other game elements here */}
      </div>
    </div>
  );
};

export default PingPongGame;
