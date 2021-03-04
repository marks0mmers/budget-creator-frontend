import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection, Map } from "immutable";

interface LoadingState {
    loadingIndicators: Collection<string, boolean>;
}

const initialState: LoadingState = {
    loadingIndicators: Map(),
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingIndicator: (state, action: PayloadAction<string>) => {
            state.loadingIndicators = state.loadingIndicators.toMap().set(action.payload, true);
        },
        removeLoadingIndicator: (state, action: PayloadAction<string>) => {
            state.loadingIndicators = state.loadingIndicators.toMap().remove(action.payload);
        },
    },
});

export const {
    setLoadingIndicator,
    removeLoadingIndicator,
} = loadingSlice.actions;

export default loadingSlice.reducer;
