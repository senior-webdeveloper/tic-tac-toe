import { useState } from "react";
import Board from "./Board";
import './App.css'

function App() {
  //------------------ state ----------------------
  const [isX, setIsX] = useState(true);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);

  //------------------ calculating winner ----------------------
  const calculation = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const key in lines) {
      const [a, b, c] = lines[key];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null;
  }

  // ----------- clicked eachsquare ----------------
  const squareClick = (i) => {
    let tempHistory = history.slice(0, step + 1);
    const current = tempHistory[tempHistory.length - 1];
    const squares = current.squares.slice();

    if (calculation(squares) || squares[i]) {
      return;
    }
    squares[i] = isX ? 'X' : 'O';
    tempHistory = tempHistory.concat([{
      squares: squares
    }])

    setHistory(tempHistory);
    setStep(step + 1);
    setIsX(!isX);
  }

  //----------------------- history ----------------
  const jumpTo = (move) => {
    setStep(move);
    setIsX((move % 2) === 0);
  }

  const moves = history.map((value, index) => {
    const dec = index ? 'Go to ' + index + 'step' : 'New Game';
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{dec}</button>
      </li>
    )
  })

  //----------------------- display status ----------------
  const savedCurrent = history[step].squares;
  const winner = calculation(savedCurrent);
  let status;

  if (winner) {
    status = 'Winner : ' + (isX ? 'O' : 'X');
  } else {
    status = 'Next player : ' + (isX ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={savedCurrent}
          squareClick={(i) => squareClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
export default App;
