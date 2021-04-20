import { Middleware } from "@reduxjs/toolkit";
import { removeLoadingIndicator, setLoadingIndicator } from "./control/loading/loading-slice";
import { ajaxFailure } from "./session/session-slice";

const startActionTypes = /.*(fetch|create|update|delete).*/i;
const finishActionType = /.*(success|fail)/i;

export const loadingMiddleware: Middleware<unknown> = store => next => action => {
    if (ajaxFailure.match(action)) {
        store.dispatch(removeLoadingIndicator(action.payload.failedAction));
    } else if (finishActionType.test(action.type)) {
        const indicator = action.type.replace("Success", "").replace("Fail", "");
        store.dispatch(removeLoadingIndicator(indicator));
    } else if (startActionTypes.test(action.type)) {
        store.dispatch(setLoadingIndicator(action.type));
    }

    return next(action);
};
