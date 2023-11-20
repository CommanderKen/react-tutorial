import { useState } from 'react';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [next, setNext] = useState('X');

  function handleClick(index) {
    if (squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = next;
    if(next === 'X') {
      setNext('O');
    } else {
      setNext('X');
    }
    setSquares(nextSquares);
  }

  return (
    <>
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