import { User } from "../models/user";
import { Budget } from "../models/budget";

export enum ActionTypes {
    SET_CURRENT_USER = "actions/SET_CURRENT_USER",
    SET_ACTIVE_BUDGET = "actions/SET_ACTIVE_BUDGET",
}

export const SetCurrentUserCreator = (user: User) => ({
    user,
    type: ActionTypes.SET_CURRENT_USER as const,
});

type SetCurrentUser = ReturnType<typeof SetCurrentUserCreator>;

export const SetActiveBudgetCreator = (budget?: Budget) => ({
    budget,
    type: ActionTypes.SET_ACTIVE_BUDGET as const,
});

type SetActiveBudget = ReturnType<typeof SetActiveBudgetCreator>;

export type Action =
    SetCurrentUser |
    SetActiveBudget;
