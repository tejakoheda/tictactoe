import "./Tictactoe.css";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";
import { useState } from "react";

let data = ["", "", "", "", "", "", "", "", ""];

const Tictactoe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}' />`;
      data[num] = "X";
    } else {
      e.target.innerHTML = `<img src='${circle}' />`;
      data[num] = "O";
    }

    setCount(count + 1);
    checkWinner();
  };

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        setWinner(data[a]);
        setLock(true);
        return;
      }
    }
  };

  const resetGame = () => {
    data = ["", "", "", "", "", "", "", "", ""];
    setLock(false);
    setCount(0);
    setWinner(null);

    const boxes = document.getElementsByClassName("boxes");
    for (let box of boxes) {
      box.innerHTML = "";
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        {winner ? (
          <>
            Congratulations! Player{" "}
            <img
              src={winner === "X" ? cross : circle}
              alt="winner"
              style={{ width: "30px", verticalAlign: "middle" }}
            />{" "}
            Won
          </>
        ) : (
          "Tic Tac Toe"
        )}
      </h1>

      <div className="board">
        {[0, 1, 2].map((i) => (
          <div className="row1" key={i}>
            {[0, 1, 2].map((j) => {
              const index = i * 3 + j;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Tictactoe;
