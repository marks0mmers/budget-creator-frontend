import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection, Map } from "immutable";
import { Budget, CreateBudgetContract } from "../../../models/budget";

interface BudgetDataState {
    budgets: Collection<string, Budget>;
}

const initialState: BudgetDataState = {
    budgets: Map(),
};

const budgetDataSlice = createSlice({
    name: "data/budgets",
    initialState,
    reducers: {
        fetchAllBudgets: (state) => state,
        fetchAllBudgetsSuccess: (state, action: PayloadAction<Map<string, Budget>>) => {
            state.budgets = action.payload;
        },

        createBudget: (state, _: PayloadAction<CreateBudgetContract>) => state,
        createBudgetSuccess: (state, action: PayloadAction<Budget>) => {
            state.budgets = state.budgets.toMap().set(action.payload.id, action.payload);
        },

        deleteBudget: (state, _: PayloadAction<string>) => state,
        deleteBudgetSuccess: (state, action: PayloadAction<string>) => {
            state.budgets = state.budgets.toMap().remove(action.payload);
        },
    },
});

export const {
    fetchAllBudgets,
    fetchAllBudgetsSuccess,
    createBudget,
    createBudgetSuccess,
    deleteBudget,
    deleteBudgetSuccess,
} = budgetDataSlice.actions;

export default budgetDataSlice.reducer;
