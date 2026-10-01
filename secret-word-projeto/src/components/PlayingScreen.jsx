import React from "react";
import styles from "../styles/PlayingScreen.module.css";
import { useState, useRef } from "react";
const PlayingScreen = ({
  processLetter,
  pickedWord,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  pickedCategory,
  letters,
}) => {
  const [letterInput, setLetterInput] = useState("");
  const letterInputRef = useRef(null);

  //Fuction to handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    processLetter(letterInput);
    setLetterInput("");
    letterInputRef.current.focus();
  };

  return (
    <div className={styles.playing}>
      <p className={styles.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className={styles.tip}>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas.</p>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}></span>
          ),
        )}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetterInput(e.target.value)}
            value={letterInput}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default PlayingScreen;
