import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { loadingMiddleware } from "./loading-middleware";
import loadingReducer from "./control/loading/loading-slice";
import budgetControlReducer from "./control/budget/budget-slice";
import budgetDataReducer from "./data/budget/budget-slice";
import incomeSourceDataReducer from "./data/income-source/income-source-slice";
import sessionReducer from "./session/session-slice";
import { SessionEpics } from "./session/session-operations";
import { BudgetDataEpics } from "./data/budget/budget-operations";
import { IncomeSourceDataEpics } from "./data/income-source/income-source-operations";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    middleware: [epicMiddleware, loadingMiddleware],
    reducer: combineReducers({
        control: combineReducers({
            loading: loadingReducer,
            budget: budgetControlReducer,
        }),
        data: combineReducers({
            budget: budgetDataReducer,
            incomeSource: incomeSourceDataReducer,
        }),
        session: sessionReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

const rootEpic = combineEpics(
    SessionEpics,
    BudgetDataEpics,
    IncomeSourceDataEpics,
);

epicMiddleware.run(rootEpic);
