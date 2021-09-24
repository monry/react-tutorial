import React from 'react';
import {Board} from "./Board";
import {History} from "./History";
import {Model} from './Model';
import Enumerable from "linq";
import {Utility} from "./Utility";

type State = {
    history: Model.History[],
    stepNumber: number,
    ascendingSort: boolean,
    xIsNext: boolean,
};

export class Game extends React.Component<{}, State> {
    state: State = {
        history: [{
            squares: Array(9).fill(null),
            filled: false,
        }],
        stepNumber: 0,
        ascendingSort: true,
        xIsNext: true,
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const sortedHistory = Enumerable.from(history)
            .orderBy(
                (x): number => x.filled ? x.row * 3 + x.col : -1,
                (a, b) => this.state.ascendingSort ? Utility.compareNumber(a, b) : Utility.compareNumber(b, a)
            )
            .toArray();

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
                    <div>
                        Sort:
                        <button onClick={() => this.toggleSort(true)} disabled={this.state.ascendingSort}>Asc</button>
                        <button onClick={() => this.toggleSort(false)} disabled={!this.state.ascendingSort}>Desc</button>
                    </div>
                    <ol>
                        {sortedHistory.map(
                            (step, move) =>
                                <History
                                    key={move}
                                    step={step}
                                    move={this.state.ascendingSort ? move : history.length - move - 1}
                                    isCurrent={move === this.state.stepNumber}
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

    private toggleSort(ascendingSort: boolean) {
        this.setState({
            ascendingSort: ascendingSort,
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
                row: Math.floor(i / 3),
                filled: true,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
}

function calculateWinner(squares: Model.Player[]): Model.Player {
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
