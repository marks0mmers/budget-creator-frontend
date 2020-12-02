import { User } from "../models/user";
import { Budget } from "../models/budget";

export enum ActionTypes {
    SET_CURRENT_USER = "actions/SET_CURRENT_USER",
    SET_ACTIVE_BUDGET = "actions/SET_ACTIVE_BUDGET",
}

interface SetCurrentUser {
    user: User
    type: ActionTypes.SET_CURRENT_USER;
}

export const SetCurrentUserCreator = (user: User): SetCurrentUser => ({
    user,
    type: ActionTypes.SET_CURRENT_USER,
});

interface SetActiveBudget {
    budget?: Budget;
    type: ActionTypes.SET_ACTIVE_BUDGET;
}

export const SetActiveBudgetCreator = (budget?: Budget): SetActiveBudget => ({
    budget,
    type: ActionTypes.SET_ACTIVE_BUDGET,
});

export type Action =
    SetCurrentUser |
    SetActiveBudget;
