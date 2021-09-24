export type Player = string | null | undefined;
export type History = {
    squares: Player[],
    col: number | undefined,
    row: number | undefined,
};