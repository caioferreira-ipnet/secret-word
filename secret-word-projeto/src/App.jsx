//Hooks
import { useState } from "react";
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
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  //Function to pick a random word and category
  const pickWordAndCategory = () => {
    //Pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    //Pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  //Function Start Game
  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  //Process the letter input
  const processLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    console.log(letter);
  };

  //Restart the game
  const restartGame = () => {
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
        {gameStage === "gameOver" && <GameOverScreen retry={restartGame} />}
      </div>
    </>
  );
}

export default App;
