import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Budget, CreateBudgetContract, UpdateBudgetContract } from "../../../models/budget";

interface BudgetDataState {
    budgets: Map<string, Budget>;
}

const initialState: BudgetDataState = {
    budgets: new Map<string, Budget>(),
};

const budgetDataSlice = createSlice({
    name: "data/budgets",
    initialState,
    reducers: {
        fetchAllBudgets: state => state,
        fetchAllBudgetsSuccess: (state, action: PayloadAction<Map<string, Budget>>) => {
            state.budgets = action.payload;
        },

        createBudget: (state, _: PayloadAction<CreateBudgetContract>) => state,
        createBudgetSuccess: (state, action: PayloadAction<Budget>) => {
            state.budgets.set(action.payload.id, action.payload);
        },

        deleteBudget: (state, _: PayloadAction<string>) => state,
        deleteBudgetSuccess: (state, action: PayloadAction<string>) => {
            state.budgets.delete(action.payload);
        },

        updateBudget: (state, _: PayloadAction<UpdateBudgetContract>) => state,
        updateBudgetSuccess: (state, action: PayloadAction<Budget>) => {
            state.budgets.set(action.payload.id, action.payload);
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
    updateBudget,
    updateBudgetSuccess,
} = budgetDataSlice.actions;

export default budgetDataSlice.reducer;
