//Hooks
import { useState } from "react";
//CSS
import "./App.css";
//Components
import StartScreen from "./components/StartScreen";
//Data
import { wordsList } from "./data/words";

//Variables
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "playing" },
  { id: 3, name: "gameOver" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  return (
    <>
      <div className="App">
        {gameStage === "start" && <StartScreen />}
        {gameStage === "playing" && <PlayingScreen />}
        {gameStage === "gameOver" && <GameOverScreen />}
      </div>
    </>
  );
}

export default App;
