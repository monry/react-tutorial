export type Player = string | null | undefined;
// export type History = {
//     squares: Player[],
//     col: number | undefined,
//     row: number | undefined,
// };
export type FilledHistory = {
    squares: Player[],
    col: number,
    row: number,
    filled: true,
}
export type EmptyHistory = {
    squares: Player[],
    filled: false,
}
export type History = FilledHistory | EmptyHistory;
