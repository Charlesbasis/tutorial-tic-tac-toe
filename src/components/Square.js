export const Square = ({ value, onSquareClick, isWinning }) => {
  
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}
