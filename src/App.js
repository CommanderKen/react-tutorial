import { useState } from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [nextSimbol, setNextSimbol] = useState('X');
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if(nextSimbol === 'X') {
      setNextSimbol('O');
    } else {
      setNextSimbol('X');
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    if (nextMove % 2 === 0) {
      setNextSimbol('X');
    } else {
      setNextSimbol('O');
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="move" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board nextSimbol={nextSimbol} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({nextSimbol, squares, onPlay}) {
  function handleClick(index) {
    console.log('squares', squares);
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = nextSimbol;
    onPlay(nextSquares);  
  }

  const winner = calculateWinner(squares);
  let boardStatus;
  if (winner) {
    if(nextSimbol === 'X') {
      boardStatus = 'Winner: O';
    } else {
      boardStatus = 'Winner: X';
    }
  } else {
    boardStatus = 'Next player is: ' + nextSimbol;
  }

  return (
    <>
      {/* <button className="restart" onClick={restart}>Restart</button> */}
      <div className="status">{boardStatus}</div>
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