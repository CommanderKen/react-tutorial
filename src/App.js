import { useState } from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [next, setNext] = useState('X');
  const [status, setStatus] = useState('Next player is: X');

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = next;
    const actual = next;
    if(next === 'X') {
      setNext('O');
      setStatus('Next player is: O');
    } else {
      setNext('X');
      setStatus('Next player is: X');
    }
    setSquares(nextSquares);
    if (calculateWinner(nextSquares)) {
      setStatus('Winner is: ' + actual);
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNext('X');
    setStatus('Next player is: X');
  }

  return (
    <>
      <div className="status">{status}</div>
      <button className="restart" onClick={restart}>Restart</button>
      <div className="board-row">
        <Square value={squares[0]} handleSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} handleSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} handleSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} handleSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} handleSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} handleSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} handleSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Square({value, handleSquareClick}) {
  return (
    <button className="square" onClick={handleSquareClick}>{value}</button>
  )
}

function calculateWinner(squares) {
  console.log(squares[0] == squares[1] == squares[2]);
  if ( (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== null)
    || (squares[3] === squares[4] && squares[4] === squares[5] && squares[3] !== null)
    || (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== null)
    || (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== null)
    || (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== null)
    || (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== null)
    || (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== null)
    || (squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== null)) {
    return true;
  }
  return false;
}