import React from "react";
import {Player} from "./types";

type Props = {
    step: {
        squares: Player[],
    },
    move: number,
    onClick: () => void,
}

export class History extends React.Component<Props> {
    render() {
        const description = this.props.move > 0 ?
            `Go to move #${this.props.move}` :
            'Go to game start';

        return (
            <li>
                <button onClick={this.props.onClick}>{description}</button>
            </li>
        );
    }
}