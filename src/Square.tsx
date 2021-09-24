import React from "react";
import {Model} from "./Model";

type Props = {
    value: Model.Player,
    onClick: () => void,
}

export function Square(props: Props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
