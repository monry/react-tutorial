import React from "react";
import {Model} from "./Model";
import {Square} from "./Square";

type Props = {
    squares: Model.Player[],
    onClick: (i: number) => void,
};

export class Board extends React.Component<Props> {
    render() {
        return (
            <div>
                {[0, 1, 2].map((rowIndex) => (
                    <div className="board-row">
                        {[0, 1, 2].map((columnIndex) => (
                            this.renderSquare(rowIndex * 3 + columnIndex)
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    private renderSquare(i: number) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
}
