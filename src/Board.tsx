import React from "react";
import {Model} from "./Model";
import {Square} from "./Square";

type Props = {
    cells: Model.Cell[],
    causeOfVictoryCells?: Model.Cell[],
    onClick: (i: number) => void,
};

export class Board extends React.Component<Props> {
    render() {
        return (
            <div>
                {[0, 1, 2].map((rowIndex) => (
                    <div key={rowIndex} className="board-row">
                        {[0, 1, 2].map((columnIndex) => (
                            this.renderSquare(rowIndex, columnIndex)
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    private renderSquare(rowIndex: number, columnIndex: number) {
        const index = rowIndex * 3 + columnIndex;
        return (
            <Square
                key={`${rowIndex}-${columnIndex}`}
                cell={this.props.cells[index]}
                causeOfVictoryCells={this.props.causeOfVictoryCells}
                onClick={() => this.props.onClick(index)}
            />
        );
    }
}
