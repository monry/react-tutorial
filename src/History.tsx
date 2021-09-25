import React from "react";
import {Model} from "./Model";

type Props = {
    step: Model.History,
    move: number,
    isCurrent: boolean,
    onClick: () => void,
}

export function History(props: Props) {
    const description = props.step.filled ?
        `Go to move #${props.move} (${props.step.col}, ${props.step.row})` :
        'Go to game start';

    return (
        <li>
            <button
                onClick={props.onClick}
                className={props.isCurrent ? 'current' : undefined} // ココもう少し綺麗に書きたいなぁ…
            >{description}</button>
        </li>
    );
}