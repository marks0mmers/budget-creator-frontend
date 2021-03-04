import { Map } from "immutable";
import { Budget, CreateBudgetContract } from "../../../models/budget";
import { BudgetDataActionTypes as types } from "./budget-types";

export const FetchAllBudgetsCreator = () => ({
    type: types.FETCH_ALL_BUDGETS as const,
});

export type FetchAllBudgets = ReturnType<typeof FetchAllBudgetsCreator>;

export const FetchAllBudgetsSuccessCreator = (budgets: Map<string, Budget>) => ({
    budgets,
    type: types.FETCH_ALL_BUDGETS_SUCCESS as const,
});

export type FetchAllBudgetsSuccess = ReturnType<typeof FetchAllBudgetsSuccessCreator>;

export const CreateBudgetCreator = (budget: CreateBudgetContract) => ({
    budget,
    type: types.CREATE_BUDGET as const,
});

export type CreateBudget = ReturnType<typeof CreateBudgetCreator>;

export const CreateBudgetSuccessCreator = (budget: Budget) => ({
    budget,
    type: types.CREATE_BUDGET_SUCCESS as const,
});

export type CreateBudgetSuccess = ReturnType<typeof CreateBudgetSuccessCreator>;

export const DeleteBudgetCreator = (budgetId: string) => ({
    budgetId,
    type: types.DELETE_BUDGET as const,
});

export type DeleteBudget = ReturnType<typeof DeleteBudgetCreator>;

export const DeleteBudgetSuccessCreator = (budgetId: string) => ({
    budgetId,
    type: types.DELETE_BUDGET_SUCCESS as const,
});

export type DeleteBudgetSuccess = ReturnType<typeof DeleteBudgetSuccessCreator>;

export type BudgetDataActions =
    FetchAllBudgets |
    FetchAllBudgetsSuccess |
    CreateBudget |
    CreateBudgetSuccess |
    DeleteBudget |
    DeleteBudgetSuccess;
