import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill(""));
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || data[index] !== "") {
      return;
    }
    
    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    
    checkWins(newData, count);
  }

  const checkWins = (board, moveCount) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        won(board[a]);
        return;
      }
    }

    if (moveCount === 8) {
      // It's a tie
      won("tie");
    }
  }

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = "Congratulations: X wins";
    } else if (winner === "o") {
      titleRef.current.innerHTML = "Congratulations: O wins";
    } else {
      titleRef.current.innerHTML = "It's a tie!";
    }
  }

  const reset = () => {
    setCount(0);
    setLock(false);
    setData(Array(9).fill(""));
    titleRef.current.innerHTML = "Tic Tac Toe Game In React";
  }

 return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className='board'>
        <div className='row1'>
          {data.slice(0, 3).map((value, index) => (
            <div className='boxes' key={index} onClick={() => toggle(index)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
        <div className='row2'>
          {data.slice(3, 6).map((value, index) => (
            <div className='boxes' key={index + 3} onClick={() => toggle(index + 3)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
        <div className='row3'>
          {data.slice(6, 9).map((value, index) => (
            <div className='boxes' key={index + 6} onClick={() => toggle(index + 6)}>
              {value === "x" && <img src={cross_icon} alt="Cross" />}
              {value === "o" && <img src={circle_icon} alt="Circle" />}
            </div>
          ))}
        </div>
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  )
}

export default TicTacToe
