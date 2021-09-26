import {Cell, Player} from "./types";
import Enumerable from "linq";

export class Utility {
    static calculateWinner(cells: Cell[]): [boolean, Player, Cell[] | undefined] {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] != null && cells[a].player != null && cells[a].player === cells[b].player && cells[a].player === cells[c].player) {
                return [true, cells[a].player, lines[i].map(x => cells[x])];
            }
        }
        return [Enumerable.from(cells).all(x => x.player != null), undefined, undefined];
    }

}