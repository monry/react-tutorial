import React from "react";
import {Player} from "./types";

type Props = {
    value: Player,
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
