import {Cell, Player} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Cell = {
    index: 0,
    player: undefined,
}

export const cellSlice = createSlice({
    name: 'cell',
    initialState: initialState,
    reducers: {
        select: (state, action: PayloadAction<Player>) => {
            state.player = action.payload;
        },
    },
});