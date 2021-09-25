import React from "react";
import {Model} from "./Model";
import Enumerable from "linq";

type Props = {
    cell: Model.Cell,
    causeOfVictoryCells?: Model.Cell[],
    onClick: () => void,
}

export function Square(props: Props) {
    return (
        <button
            className={`square${Enumerable.from(props.causeOfVictoryCells).any(x => x === props.cell) ? ' cause-of-victory' : ''}`}
            onClick={props.onClick}
        >
            {props.cell.player}
        </button>
    );
}
