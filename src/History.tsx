import React from "react";
import {Model} from "./Model";

type Props = {
    step: Model.History,
    move: number,
    isCurrent: boolean,
    onClick: () => void,
}

export class History extends React.Component<Props> {
    render() {
        const description = this.props.move > 0 ?
            `Go to move #${this.props.move} (${this.props.step.col}, ${this.props.step.row})` :
            'Go to game start';

        return (
            <li>
                <button
                    onClick={this.props.onClick}
                    className={this.props.isCurrent ? 'current' : undefined} // ココもう少し綺麗に書きたいなぁ…
                >{description}</button>
            </li>
        );
    }
}