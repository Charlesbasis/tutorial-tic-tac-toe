import { useState } from "react";
import { Board } from "./components/Board";

export default function Game () {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentmove, setCurrentMove] = useState(0);
  const xIsNext = currentmove % 2 === 0;
  const currentSquares = history[currentmove].squares;
  const [sortAscending, setSortAscending] = useState(true);

  const handlePlay = (nextSquares, i) => {
    const nextHistory = [...history.slice(0, currentmove + 1), { squares: nextSquares, location: i }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const { squares, location } = step;
    const row = Math.floor(location / 3) + 1;
    const col = location % 3 + 1;
    let description;
    if (move > 0) {
      description = `Go to move #${move} (${row}:${col})`;
    } else {
      description = 'Go to game start';
    }
    if (move === currentmove) {
      return (
        <li key={move}>
          <span>You are at move #{move}</span>
        </li>
      )
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>      
    )
  });

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
  }

  const sortedMoves = sortAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleSortToggle}>
          {sortAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
