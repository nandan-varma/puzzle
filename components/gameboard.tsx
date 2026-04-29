interface Card {
  value: string;
  flipped: boolean;
}

interface GameBoardProps {
  cards: Card[];
  onCardClick: (index: number) => void;
}

const GameBoard = ({ cards, onCardClick }: GameBoardProps) => {
  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          className={`card ${card.flipped ? '' : 'flipped'}`}
          onClick={() => onCardClick(index)}
        >
          <div className="card-front">{card.value}</div>
          <div className="card-back"></div>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;