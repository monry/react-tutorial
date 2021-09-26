import React from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {gameSlice} from "../slices/game";

type Props = {
    index: number,
}

export function History(props: Props) {
    const dispatch = useAppDispatch();
    const currentStepIndex = useAppSelector(state => state.game.currentStepIndex);
    const step = useAppSelector(state => state.steps[props.index]);
    const description = step.filled ?
        `Go to move #${step.index} (${step.col}, ${step.row})` :
        'Go to game start';

    return (
        <li>
            <button
                onClick={() => dispatch(gameSlice.actions.selectStep(step))}
                className={currentStepIndex === step.index ? 'current' : undefined}
            >{description}</button>
        </li>
    );
}