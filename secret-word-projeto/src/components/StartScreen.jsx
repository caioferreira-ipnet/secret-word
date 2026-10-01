import React from "react";
import styles from "../styles/StartScreen.module.css";
const StartScreen = () => {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão para começar!</p>
      <button>Começar</button>
    </div>
  );
};

export default StartScreen;
