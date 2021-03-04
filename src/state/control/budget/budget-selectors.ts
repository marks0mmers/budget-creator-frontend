import { createSelector } from "reselect";
import { getBudgets } from "../../data/budget/budget-selectors";
import { RootState } from "../../root-reducer";

export const getActiveBudgetId = (state: RootState) => state.control.budget.activeBudgetId;

export const getActiveBudget = createSelector(
    [getBudgets, getActiveBudgetId],
    (budgets, activeBudget) => activeBudget ? budgets.get(activeBudget) : undefined,
);
