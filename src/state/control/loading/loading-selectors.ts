import { createBudget, deleteBudget, fetchAllBudgets } from "../../data/budget/budget-slice";
import { fetchCurrentUser, login } from "../../session/session-slice";
import { RootState } from "../../store";

export const isSessionLoading = (state: RootState) => {
    const ind = state.control.loading.loadingIndicators;
    return (
        ind.get(fetchCurrentUser.type) ||
        ind.get(login.type)
    );
};

export const isBudgetLoading = (state: RootState) => {
    const ind = state.control.loading.loadingIndicators;
    return (
        ind.get(createBudget.type) ||
        ind.get(deleteBudget.type) ||
        ind.get(fetchAllBudgets.type)
    );
};
