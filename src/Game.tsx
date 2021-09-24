import React from 'react';
import {Board} from "./Board";
import {History} from "./History";
import {Model} from './Model';
import Enumerable from "linq";
import {Utility} from "./Utility";

type State = {
    histories: Model.History[],
    stepNumber: number,
    ascendingSort: boolean,
    xIsNext: boolean,
    gameResult: Model.GameResult,
};

export class Game extends React.Component<{}, State> {
    state: State = {
        histories: [{
            cells: Array<Model.Cell>(9).fill({}),
            filled: false,
        }],
        stepNumber: 0,
        ascendingSort: true,
        xIsNext: true,
        gameResult: {
            endOfTheGame: false,
        },
    };

    render() {
        const histories = this.state.histories;
        const current = histories[this.state.stepNumber];
        const [winner,] = calculateWinner(current.cells);
        const sortedHistories = Enumerable.from(histories)
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
                        cells={current.cells}
                        causeOfVictoryCells={this.state.gameResult.causeOfVictoryCells}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        Sort:
                        <button onClick={() => this.toggleSort(true)} disabled={this.state.ascendingSort}>Asc</button>
                        <button onClick={() => this.toggleSort(false)} disabled={!this.state.ascendingSort}>Desc
                        </button>
                    </div>
                    <ol>
                        {sortedHistories.map(
                            (step, move) =>
                                <History
                                    key={move}
                                    step={step}
                                    move={this.state.ascendingSort ? move : histories.length - move - 1}
                                    isCurrent={(this.state.ascendingSort ? move : histories.length - move - 1) === this.state.stepNumber}
                                    onClick={() => this.jumpTo(move)}
                                />
                        )}
                    </ol>
                </div>
            </div>
        );
    }

    private jumpTo(step: number) {
        const gameResult = {...this.state.gameResult};
        const cells = this.state.histories[step].cells.slice();
        const [winner, causeOfVictoryCells] = calculateWinner(cells);
        if (winner != null) {
            gameResult.endOfTheGame = true;
            gameResult.winner = winner;
            gameResult.causeOfVictoryCells = causeOfVictoryCells;
        } else {
            gameResult.endOfTheGame = false;
            gameResult.winner = undefined;
            gameResult.causeOfVictoryCells = undefined;
        }
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
            gameResult: gameResult,
        });
    }

    private toggleSort(ascendingSort: boolean) {
        this.setState({
            ascendingSort: ascendingSort,
        });
    }

    private handleClick(i: number) {
        const history = this.state.histories.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const cells = current.cells.slice();
        const gameResult = {...this.state.gameResult};
        if (gameResult.endOfTheGame || cells[i].player != null) {
            return;
        }

        cells[i] = {
            player: this.state.xIsNext ? 'X' : 'O',
        };

        const [winner, causeOfVictoryCells] = calculateWinner(cells);
        if (winner != null) {
            gameResult.endOfTheGame = true;
            gameResult.winner = winner;
            gameResult.causeOfVictoryCells = causeOfVictoryCells;
        }

        this.setState({
            histories: history.concat([{
                cells: cells,
                col: i % 3,
                row: Math.floor(i / 3),
                filled: true,
            }]),
            stepNumber: history.length,
            gameResult: gameResult,
            xIsNext: !this.state.xIsNext,
        });
    }
}

function calculateWinner(cells: Model.Cell[]): [Model.Player, Model.Cell[] | undefined] {
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
        if (cells[a] != null && cells[a].player === cells[b].player && cells[a].player === cells[c].player) {
            return [cells[a].player, lines[i].map(x => cells[x])];
        }
    }
    return [undefined, undefined];
}
