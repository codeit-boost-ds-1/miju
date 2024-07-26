import React, { useState } from "react";
import Button from "./Button";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import { compareHand, generateRandomHand } from "./utils";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  // hand와 otherHand를 state로 바꿔 주세요
  const [hand, setHand] = useState("rock");
  const [otherHand, setOtherHand] = useState("rock");
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    // hand의 값을 nextHand 로 바꿔 주세요
    // otherHand의 값을 generateRandomHand()의 리턴 값으로 바꿔주세요
    const nextOtherHand = generateRandomHand();
    setHand(nextHand);
    setOtherHand(nextOtherHand);

    // gameHistory에 nextHistoryItem 을 추가해 주세요
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);

    const comparison = compareHand(nextHand, nextOtherHand);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    // hand와 otherHand의 값을 'rock' 으로 바꿔주세요
    setHand("rock");
    setOtherHand("rock");

    // gameHistory를 비워주세요
    setGameHistory([]);

    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    // 여기에 코드를 작성하세요
    let num = Number(e.target.value);
    if (num > 9) num = 9;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div>
        {score} : {otherScore}
      </div>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <input
          type="number"
          value={bet}
          min={1}
          max={9}
          onChange={handleBetChange}
        ></input>
      </div>
      <p>승부 기록: {gameHistory.join(", ")}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
