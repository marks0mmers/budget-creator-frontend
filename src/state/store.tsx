// import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { createEpicMiddleware } from "redux-observable";
// import { loadingMiddleware } from "./loading-middleware";
// import { rootEpic } from "./root-epic";
// import { rootReducer } from "./root-reducer";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { loadingMiddleware } from "./loading-middleware";
import { rootEpic } from "./root-epic";
import loadingReducer from "./control/loading/loading-slice";
import budgetControlReducer from "./control/budget/budget-slice";
import budgetDataReducer from "./data/budget/budget-slice";
import sessionReducer from "./session/session-slice";

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
        }),
        session: sessionReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

epicMiddleware.run(rootEpic);
