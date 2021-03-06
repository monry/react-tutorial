import {configureStore} from "@reduxjs/toolkit";
import {stepsSlice} from "./slices/steps";
import {gameSlice} from "./slices/game";
import {useSelector, TypedUseSelectorHook, useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        steps: stepsSlice.reducer,
        game: gameSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
