import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { loadingMiddleware } from "./loading-middleware";
import { rootEpic } from "./root-epic";
import { rootReducer } from "./root-reducer";

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 50,
});

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware,
            loadingMiddleware,
        ),
    ),
);

epicMiddleware.run(rootEpic);
