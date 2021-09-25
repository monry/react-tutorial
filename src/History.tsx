import React from "react";
import {Model} from "./Model";

type Props = {
    history: Model.History,
    index: number,
    isCurrent: boolean,
    onClick: () => void,
}

export function History(props: Props) {
    const description = props.history.filled ?
        `Go to move #${props.index} (${props.history.col}, ${props.history.row})` :
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