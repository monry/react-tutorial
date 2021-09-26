import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {gameSlice} from "../slices/game";
import {stepsSlice} from "../slices/steps";
import Enumerable from "linq";

type Props = {
    index: number,
}

export function Cell(props: Props) {
    const dispatch = useAppDispatch();
    const currentPlayer = useAppSelector(state => state.game.currentPlayer);
    const currentStep = useAppSelector(state => state.steps[state.game.currentStepIndex]);
    const canSelect = useAppSelector(state => !state.game.endOfTheGame && state.steps[state.game.currentStepIndex].cells[props.index].player == null);
    const causeOfVictoryCells = useAppSelector(state => state.game.causeOfVictoryCells);
    const cell = currentStep.cells[props.index];
    const onClick = () => {
        dispatch(stepsSlice.actions.addStep([currentStep, {index: props.index, player: currentPlayer}]))
        dispatch(gameSlice.actions.moveNext());
    };
    const classNames = ['square'];
    if (causeOfVictoryCells != null && Enumerable.from(causeOfVictoryCells).any(x => x.index === props.index)) {
        classNames.push('cause-of-victory');
    }
    return (
        <button
            className={classNames.join(' ')}
            onClick={onClick}
            disabled={!canSelect}
        >
            {cell.player}
        </button>
    );
}
