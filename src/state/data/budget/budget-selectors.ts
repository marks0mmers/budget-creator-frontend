import { RootState } from "../../root-reducer";

export const getBudgets = (state: RootState) => state.data.budget.budgets;
