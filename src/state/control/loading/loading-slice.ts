import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface LoadingState {
    loadingIndicators: Map<string, boolean>;
}

const initialState: LoadingState = {
    loadingIndicators: new Map<string, boolean>(),
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingIndicator: (state, action: PayloadAction<string>) => {
            state.loadingIndicators.set(action.payload, true);
        },
        removeLoadingIndicator: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload) {
                state.loadingIndicators.delete(action.payload);
            }
        },
    },
});

export const {
    setLoadingIndicator,
    removeLoadingIndicator,
} = loadingSlice.actions;

export default loadingSlice.reducer;
