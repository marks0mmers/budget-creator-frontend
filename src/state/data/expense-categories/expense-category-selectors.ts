import { RootState } from "../../store";

export const getExpenseCategories = (state: RootState) => state.data.expenseCategory.expenseCategories;
