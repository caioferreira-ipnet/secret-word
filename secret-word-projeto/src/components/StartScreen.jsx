import React from "react";
import styles from "../styles/StartScreen.module.css";
const StartScreen = ({ startGame }) => {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão para começar!</p>
      <button onClick={startGame}>Começar</button>
    </div>
  );
};

export default StartScreen;
