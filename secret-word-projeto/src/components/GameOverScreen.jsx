import React from "react";

const GameOverScreen = ({ retry }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Retry</button>
    </div>
  );
};

export default GameOverScreen;
