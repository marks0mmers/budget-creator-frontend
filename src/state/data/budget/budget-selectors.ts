import { RootState } from "../../store";

export const getBudgets = (state: RootState) => state.data.budget.budgets;
