import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cell, Step} from '../types'
import Enumerable from "linq";

const initialState: Step[] = [{
    index: 0,
    cells: Enumerable.from(Array<Cell>(9))
        .select((x, index): Cell => ({
            index: index,
            player: undefined,
        }))
        .toArray(),
    filled: false,
}];

export const stepsSlice = createSlice({
    name: 'steps',
    initialState: initialState,
    reducers: {
        addStep: (state, action: PayloadAction<[Step, Cell]>) => {
            const [currentStep, cell] = action.payload;
            const cells = currentStep.cells.map(x => x.index === cell.index ? cell : x);
            // ココの上書きが気持ち悪い
            state = state.filter(x => x.index <= currentStep.index);
            state.push({
                index: currentStep.index + 1,
                cells: cells,
                filled: true,
                col: Math.floor(cell.index % 3),
                row: Math.floor(cell.index / 3),
            });
            return state;
        },
    },
});