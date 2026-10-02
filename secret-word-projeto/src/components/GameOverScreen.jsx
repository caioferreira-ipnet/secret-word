import React from "react";
import styles from "../styles/GameOverScreen.module.css";
const GameOverScreen = ({ retry, score }) => {
  return (
    <div className={styles.gameOverContainer}>
      <h1>Game Over</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Retry</button>
    </div>
  );
};

export default GameOverScreen;
