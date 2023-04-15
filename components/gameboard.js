const GameBoard = ({ cards, onCardClick }) => {
    return (
        <div className="game-board">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`card ${card.flipped ? '' : 'flipped'}`}
                    onClick={() => onCardClick(index)}
                >
                    <div className="card-front">{card.value}</div>
                    <div className="card-back"></div>
                </div>
            ))}
            <style jsx>{`
          .game-board {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 10px;
          }
        `}</style>
        </div>
    );
};
export default GameBoard;