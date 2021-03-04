import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetControlState {
    activeBudgetId?: string;
}

const initialState: BudgetControlState = {
    activeBudgetId: undefined,
};

const budgetControlSlice = createSlice({
    name: "control/budget",
    initialState: initialState,
    reducers: {
        setActiveBudget: (state, action: PayloadAction<string | undefined>) => {
            window.localStorage.setItem("activeBudgetId", action.payload ?? "");
            state.activeBudgetId = action.payload;
        },
    },
});

export const {
    setActiveBudget,
} = budgetControlSlice.actions;

export default budgetControlSlice.reducer;
