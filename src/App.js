import { useEffect, useState } from "react";
import { wordList } from "./wordList";

function App() {
  const [word, setWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );
  const [guessingWords, setGuessingWords] = useState([]);
  const [chance, setChance] = useState(5);
  const [isWin, setIsWin] = useState(false);
  const letters = word.split("");

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const activeLetters = alphabet.filter((item) => letters.includes(item));
  const inactiveLetters = alphabet.filter((item) => !letters.includes(item));
  useEffect(() => {
    if (letters.every((letter) => guessingWords.includes(letter))) {
      setIsWin(true);
    }
  }, [guessingWords]);
  console.log(isWin);

  const handleClick = (item, event) => {
    setGuessingWords((prevValue) => {
      return [...prevValue, item];
    });
    if (activeLetters.includes(item)) {
      event.currentTarget.classList.add("active_letter");
    } else if (inactiveLetters.includes(item)) {
      setChance(chance - 1);
      event.currentTarget.classList.add("inactive_letter");
    }
  };

  const head = <div className="head"></div>;
  const rightSide = (
    <>
      <div className="body"></div>
      <div className="right_arm"></div>
    </>
  );
  const leftSide = <div className="left_arm"></div>;
  const rightLeg = <div className="right_leg"></div>;
  const leftLeg = <div className="left_leg"></div>;
  const partOfHangman = [head, rightSide, leftSide, rightLeg, leftLeg];
  return (
    <div className="app">
      <div className="hangman">
        <div className="bottom_side"></div>
        <div className="vertical_side"></div>
        <div className="horizontal_side"></div>
        <div className="small_vertical_side"></div>
        {chance < 5 && partOfHangman[0]}
        {chance < 4 && partOfHangman[1]}
        {chance < 3 && partOfHangman[2]}
        {chance < 2 && partOfHangman[3]}
        {chance < 1 && partOfHangman[4]}
      </div>
      {isWin && <h1>You Win...</h1>}
      {chance == 0 && <h1>Game over...</h1>}
      {!(isWin || chance == 0) && (
        <div className="info_part">
          <h1 style={{ display: "flex" }}>
            {letters.map((letter) => (
              <div
                style={{
                  marginRight: "10px",
                  borderBottom: "5px solid black",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                    visibility: guessingWords.includes(letter)
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </h1>
          <div className="alphabet">
            {alphabet.map((item) => {
              return (
                <button
                  onClick={(event) => handleClick(item, event)}
                  className="letter"
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
