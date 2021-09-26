export type Player = string | undefined;
export type Cell = {
    index: number,
    player?: Player,
}
export type FilledStep = {
    index: number,
    cells: Cell[],
    col: number,
    row: number,
    filled: true,
}
export type EmptyStep = {
    index: number,
    cells: Cell[],
    filled: false,
}
export type Game = {
    endOfTheGame: boolean,
    winner?: Player,
    currentStepIndex: number,
    currentPlayer: Player,
    causeOfVictoryCells?: Cell[],
    sortAscending: boolean,
}
export type Step = FilledStep | EmptyStep;
