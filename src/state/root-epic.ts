import { combineEpics } from "redux-observable";
import { BudgetDataEpics } from "./data/budget/budget-operations";
import { SessionEpics } from "./session/session-operations";

export const rootEpic = combineEpics(
    SessionEpics,
    BudgetDataEpics,
);
