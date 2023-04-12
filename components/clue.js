import React from "react";

const Clue = ({ clueText, isSolved }) => {
  return (
    <div className={`clue ${isSolved ? "solved" : ""}`}>
      {clueText}
    </div>
  );
};

export default Clue;