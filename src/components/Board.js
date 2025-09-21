import { calculateWinner } from "../utils/utils";
import { Square } from "./Square";

export const Board = ({ xIsNext, squares, onPlay }) => {

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const boardRows = [];
  for (let i = 0; i < 3; i++) {
    const rowSquares = [];
    for (let j = 0; j < 3; j++) {
      const squareIndex = i * 3 + j;
      const isWinningSquare = winningLine.includes(squareIndex);
      rowSquares.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinning={isWinningSquare}
        />
      );
    }
    boardRows.push(<div className="board-row" key={i}>{rowSquares}</div>);
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

return (
  <>
    <div className="status">{status}</div>
    {boardRows}
  </>
);
}
