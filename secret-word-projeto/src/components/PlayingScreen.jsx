import React from "react";

const PlayingScreen = ({ processLetter }) => {
  return (
    <div>
      <h1>Playing Screen</h1>
      <button onClick={processLetter}>Process Letter</button>
    </div>
  );
};

export default PlayingScreen;
