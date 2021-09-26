import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cell, Game, Player, Step} from "../types";
import {Utility} from "../Utility";

const initialState: Game = {
    endOfTheGame: false,
    currentStepIndex: 0,
    currentPlayer: 'X',
    sortAscending: true,
};

export const updateGameStateAction = createAction<Cell[]>('updateGameState');

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        setWinner: (state, action: PayloadAction<Player>) => {
            state.winner = action.payload;
            state.endOfTheGame = action.payload != null;
        },
        selectStep: (state, action: PayloadAction<Step>) => {
            state.currentStepIndex = action.payload.index;
            state.currentPlayer = state.currentStepIndex % 2 === 0 ? 'X' : 'O';
        },
        sortSteps: (state, action: PayloadAction<boolean>) => {
            state.sortAscending = action.payload;
        },
        moveNext: (state) => {
            state.currentStepIndex++;
            state.currentPlayer = state.currentStepIndex % 2 === 0 ? 'X' : 'O';
        },
        calculateWinner: (state, action: PayloadAction<Cell[]>) => {
            [state.endOfTheGame, state.winner, state.causeOfVictoryCells] = Utility.calculateWinner(action.payload);
        },
    },
});