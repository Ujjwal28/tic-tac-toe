import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Image from "./static/tic-tac-toe-clipart-8.jpg";
import Modal from "./components/Modal";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };

    this.test = this.test.bind(this);
  }

  test() {
    console.log("Test");
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let tie = true;
    let status;
    this.state.squares.forEach(item => {
      if (item === null) {
        tie = false;
      }
    });
    if (winner) {
      status = "Winner: ~" + winner + "~";
      // this.setState({
      //   squares: Array(9).fill(null)
      // });
    } else if (tie) {
      status = "Game Over! Match Tie";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        {winner ? <Modal body={status} /> : null}
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
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clear: true
    };
  }
  resetHandler = () => {
    console.log("reset");
  };
  render() {
    return (
      <>
        <div className="game">
          <div className="game-board">
            <img src={Image} style={{ width: "50%" }} alt="tic" />
          </div>
        </div>
        <div className="game">
          <div className="game-board">
            <Board props={this.resetHandler} clear={true} />
            <button className="btn-custom" onClick={this.resetHandler}>
              Reset
            </button>
          </div>
        </div>
      </>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
