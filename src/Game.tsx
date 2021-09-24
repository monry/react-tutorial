import React from 'react';
import {Board} from "./Board";
import {Player} from "./types";
import {History} from "./History";

type State = {
    history: {
        squares: Player[],
        col: number | null,
        row: number | null,
    }[],
    stepNumber: number,
    xIsNext: boolean,
};

export class Game extends React.Component<{}, State> {
    state: State = {
        history: [{
            squares: Array(9).fill(null),
            col: null,
            row: null,
        }],
        stepNumber: 0,
        xIsNext: true,
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status: string;
        if (winner != null) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>
                        {history.map(
                            (step, move) =>
                                <History
                                    key={move}
                                    step={step}
                                    move={move}
                                    onClick={() => this.jumpTo(move)}
                                />
                        )}
                    </ol>
                </div>
            </div>
        );
    }

    private jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    private handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) !== null || squares[i] !== null) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                col: i % 3,
                row: Math.floor(i / 3)
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
}

function calculateWinner(squares: Player[]): Player {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
