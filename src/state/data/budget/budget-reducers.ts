import { Map, Record } from "immutable";
import { Budget } from "../../../models/budget";
import { BudgetDataActions } from "./budget-actions";
import { BudgetDataActionTypes as types} from "./budget-types";

interface BudgetDataStateContract {
    budgets: Map<string, Budget>;
}

export class BudgetDataState extends Record<BudgetDataStateContract>({
    budgets: Map(),
}) {}

export const BudgetDataReducer = (
    state = new BudgetDataState(),
    action: BudgetDataActions,
) => {
    switch (action.type) {
    case types.FETCH_ALL_BUDGETS_SUCCESS:
        return state.set("budgets", action.budgets);
    case types.CREATE_BUDGET_SUCCESS:
        return state.setIn(["budgets", action.budget.id], action.budget);
    case types.DELETE_BUDGET_SUCCESS:
        return state.removeIn(["budgets", action.budgetId]);
    default:
        return state;
    }
};
