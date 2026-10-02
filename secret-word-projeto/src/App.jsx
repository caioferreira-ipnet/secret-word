//Hooks
import { useState, useEffect, useCallback } from "react";
//CSS
import "./App.css";
//Components
import StartScreen from "./components/StartScreen";
import PlayingScreen from "./components/PlayingScreen";
import GameOverScreen from "./components/GameOverScreen";
//Data
import { wordsList } from "./data/words";

//Stages of the game
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "playing" },
  { id: 3, name: "gameOver" },
];

function App() {
  //Variables
  const guessesQtd = 3;
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  //Function to pick a random word and category
  const pickWordAndCategory = useCallback(() => {
    //Pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    //Pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  //Function Start Game

  const startGame = useCallback(() => {
    //clear All Letters
    clearLetterStates();
    setGuesses(guessesQtd);
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickedCategory]);

  //Process the letter input
  const processLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //Push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      setScore((actualScore) => actualScore + 100);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    console.log(letter);
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // WIN CONDITION
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //Win condition
    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === "playing"
    ) {
      //Add score
      setScore((actualScore) => actualScore + 100);

      //Restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame, gameStage]);

  useEffect(() => {
    if (guesses <= 0) {
      //Reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //Restart the game
  const restartGame = () => {
    setScore(0);
    setGuesses(guessesQtd);
    clearLetterStates();
    setGameStage(stages[0].name);
  };

  return (
    <>
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "playing" && (
          <PlayingScreen
            processLetter={processLetter}
            pickedWord={pickedWord}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
            pickedCategory={pickedCategory}
            letters={letters}
          />
        )}
        {gameStage === "gameOver" && (
          <GameOverScreen retry={restartGame} score={score} />
        )}
      </div>
    </>
  );
}

export default App;
