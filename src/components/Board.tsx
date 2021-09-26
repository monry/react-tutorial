import React from "react";
import {Cell} from "./Cell";

export function Board() {
    return (
        <div>
            {[0, 1, 2].map((rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {[0, 1, 2].map((columnIndex) => (
                        <Cell
                            key={`${rowIndex}-${columnIndex}`}
                            index={rowIndex * 3 + columnIndex}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
