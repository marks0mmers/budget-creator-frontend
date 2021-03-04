import { Record } from "immutable";
import { BudgetControlActions } from "./budget-actions";
import { BudgetControlActionTypes as types } from "./budget-types";

interface BudgetControlStateContract {
    activeBudgetId?: string;
}

export class BudgetControlState extends Record<BudgetControlStateContract>({
    activeBudgetId: window.localStorage.getItem("activeBudgetId") ?? undefined,
}) {}

export const BudgetControlReducer = (
    state = new BudgetControlState(),
    action: BudgetControlActions,
) => {
    switch (action.type) {
    case types.SET_ACTIVE_BUDGET:
        window.localStorage.setItem("activeBudgetId", action.budgetId ?? "");
        return state.set("activeBudgetId", action.budgetId);
    default:
        return state;
    }
};
