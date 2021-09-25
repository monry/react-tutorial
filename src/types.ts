export type Player = string | undefined;
export type Cell = {
    player?: Player,
}
export type FilledHistory = {
    index: number,
    cells: Cell[],
    col: number,
    row: number,
    filled: true,
}
export type EmptyHistory = {
    index: number,
    cells: Cell[],
    filled: false,
}
export type GameResult = {
    endOfTheGame: boolean,
    winner?: Player,
    causeOfVictoryCells?: Cell[],
}
export type History = FilledHistory | EmptyHistory;
