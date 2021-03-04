import { BudgetDataActionTypes } from "../../data/budget/budget-types";
import { RootState } from "../../root-reducer";
import { SessionActionTypes } from "../../session/session-types";

export const isSessionLoading = (state: RootState) => {
    const ind = state.control.loading.loadingIndicators;
    return (
        ind.get(SessionActionTypes.FETCH_CURRENT_USER) ||
        ind.get(SessionActionTypes.LOGIN)
    );
};

export const isBudgetLoading = (state: RootState) => {
    const ind = state.control.loading.loadingIndicators;
    return (
        ind.get(BudgetDataActionTypes.CREATE_BUDGET) ||
        ind.get(BudgetDataActionTypes.DELETE_BUDGET) ||
        ind.get(BudgetDataActionTypes.FETCH_ALL_BUDGETS)
    );
};
