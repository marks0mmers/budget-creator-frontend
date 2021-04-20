import { ExpenseCategory, UpsertExpenseCategoryContract } from "../../../models/expense-category";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseCategoryDataState {
    expenseCategories: Map<string, ExpenseCategory>;
}

const initialState: ExpenseCategoryDataState = {
    expenseCategories: new Map<string, ExpenseCategory>(),
};

const expenseCategoryDataSlice = createSlice({
    name: "data/expenseCategories",
    initialState: initialState as ExpenseCategoryDataState,
    reducers: {
        fetchExpenseCategories: state => state,
        fetchExpenseCategoriesSuccess: (state: Draft<ExpenseCategoryDataState>, action: PayloadAction<Map<string, ExpenseCategory>>) => {
            state.expenseCategories = action.payload;
        },

        createExpenseCategory: (state, _: PayloadAction<UpsertExpenseCategoryContract>) => state,
        createExpenseCategorySuccess: (state, action: PayloadAction<ExpenseCategory>) => {
            state.expenseCategories.set(action.payload.id, action.payload);
        },

        deleteExpenseCategory: (state, _: PayloadAction<string>) => state,
        deleteExpenseCategorySuccess: (state, action: PayloadAction<string>) => {
            state.expenseCategories.delete(action.payload);
        },

        updateExpenseCategory: (state, _: PayloadAction<{ id: string, contract: UpsertExpenseCategoryContract }>) => state,
        updateExpenseCategorySuccess: (state, action: PayloadAction<ExpenseCategory>) => {
            state.expenseCategories.set(action.payload.id, action.payload);
        },


    },
});

export const {
    fetchExpenseCategories,
    fetchExpenseCategoriesSuccess,
    createExpenseCategory,
    createExpenseCategorySuccess,
    deleteExpenseCategory,
    deleteExpenseCategorySuccess,
    updateExpenseCategory,
    updateExpenseCategorySuccess,
} = expenseCategoryDataSlice.actions;

export default expenseCategoryDataSlice.reducer;
