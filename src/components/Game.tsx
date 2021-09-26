import React, {useEffect} from 'react';
import {Board} from "./Board";
import {History} from "./History";
import Enumerable from "linq";
import {useAppDispatch, useAppSelector} from "../store";
import {gameSlice} from "../slices/game";

export function Game() {
    const dispatch = useAppDispatch();
    const currentPlayer = useAppSelector(state => state.game.currentPlayer);
    const sortAscending = useAppSelector(state => state.game.sortAscending);
    const [winner, endOfTheGame] = useAppSelector(state => [state.game.winner, state.game.endOfTheGame]);
    const steps = useAppSelector(state => Enumerable.from(state.steps).orderBy(x => x.index * (state.game.sortAscending ? 1 : -1)).toArray());
    const currentCells = useAppSelector(state => state.steps[state.game.currentStepIndex].cells);
    useEffect(
        () => {
            dispatch(gameSlice.actions.calculateWinner(currentCells));
        },
        [currentCells, dispatch]
    );
    let status;
    if (endOfTheGame && winner == null) {
        status = 'Draw'
    } else if (endOfTheGame && winner != null) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${currentPlayer}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>
                    Sort:
                    <button onClick={() => dispatch(gameSlice.actions.sortSteps(true))} disabled={sortAscending}>Asc</button>
                    <button onClick={() => dispatch(gameSlice.actions.sortSteps(false))} disabled={!sortAscending}>Desc</button>
                </div>
                <ol>
                    {steps.map(
                        (step) =>
                            <History
                                key={step.index}
                                index={step.index}
                            />
                    )}
                </ol>
            </div>
        </div>
    );
}

