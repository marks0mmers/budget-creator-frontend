import { Middleware } from "redux";
import { removeLoadingIndicator, setLoadingIndicator } from "./control/loading/loading-slice";
import { ajaxFailure } from "./session/session-slice";

const startActionTypes =
    // eslint-disable-next-line max-len
    /.*(fetch|create|update|delete).*/i;
const finishActionType = /.*(success|fail)/i;

export const loadingMiddleware: Middleware<unknown> = store => next => action => {
    if (action.type === ajaxFailure.type) {
        store.dispatch(removeLoadingIndicator(action.payload.failedAction));
    } else if (finishActionType.test(action.type)) {
        const indicator = action.type.replace("Success", "").replace("Fail", "");
        store.dispatch(removeLoadingIndicator(indicator));
    } else if (startActionTypes.test(action.type)) {
        store.dispatch(setLoadingIndicator(action.type));
    }

    return next(action);
};