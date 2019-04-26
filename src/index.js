import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// Board
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    }
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();   //для создания копии массива, вместо изменения существующего массива    
    if (this.state.winner || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: this.calculateWinner(squares)
    })
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    )
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    return lines.reduce((acc, item) => {
      const [a, b, c] = item;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      return acc;
    }, null)
  }

  render() {
    let status = '';
    if (this.state.winner) {
      status = `Выиграл ${this.state.winner}`;
    } else {
      status = `Следующий ход: ${this.state.xIsNext ? 'X' : '0'}`;
    }
    
    return(
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

// Game
class Game extends React.Component {
  render() {
    return(
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)