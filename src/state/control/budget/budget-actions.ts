import { BudgetControlActionTypes as types } from "./budget-types";

export const SetActiveBudgetCreator = (budgetId?: string) => ({
    budgetId,
    type: types.SET_ACTIVE_BUDGET as const,
});

export type SetActiveBudget = ReturnType<typeof SetActiveBudgetCreator>;

export type BudgetControlActions = 
    SetActiveBudget;
