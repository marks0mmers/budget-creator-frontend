import { createSelector } from "reselect";
import { getBudgets } from "../../data/budget/budget-selectors";
import { RootState } from "../../store";

export const getActiveBudgetId = (state: RootState) => state.control.budget.activeBudgetId;

export const getActiveBudget = createSelector(
    getBudgets,
    getActiveBudgetId,
    (budgets, activeBudget) => {
        return activeBudget ? budgets.get(activeBudget) : undefined;
    },
);
