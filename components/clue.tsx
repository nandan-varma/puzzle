interface ClueProps {
  clueText: string;
  isSolved: boolean;
}

const Clue = ({ clueText, isSolved }: ClueProps) => {
  return <div className={`clue ${isSolved ? 'solved' : ''}`}>{clueText}</div>;
};

export default Clue;