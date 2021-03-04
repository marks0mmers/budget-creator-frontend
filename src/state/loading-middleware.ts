import { Middleware } from "redux";
import { removeLoadingIndicator, setLoadingIndicator } from "./control/loading/loading-slice";
import { ajaxFailure } from "./session/session-slice";

const startActionTypes =
    // eslint-disable-next-line max-len
    /.*(\/FETCH_|\/UPDATE_|\/DELETE_|\/CREATE_|\/SYNC_|\/APPROVE_|\/DENY_|\/ACTIVATE_|\/EDIT_|\/RESUBMIT_|\/TOGGLE|\/UPLOAD|\/LOGIN|\/APPLY|\/CLOSE|\/ASSIGN|\/RELEASE|\/TECO|\/REMOVE|\/MARK|\/COPY|\/PLACE_|\/RECALL_|\/COMPLETE_|\/MASS_CHANGE).*/i;
const finishActionType = /.*(_SUCCESS|_FAIL)/i;

export const loadingMiddleware: Middleware<unknown> = store => next => action => {
    if (action.type === ajaxFailure.type) {
        store.dispatch(removeLoadingIndicator(action.payload.failedAction));
    } else if (finishActionType.test(action.type)) {
        const indicator = action.type.replace("_SUCCESS", "").replace("_FAIL", "");
        store.dispatch(removeLoadingIndicator(indicator));
    } else if (startActionTypes.test(action.type)) {
        store.dispatch(setLoadingIndicator(action.type));
    }

    return next(action);
};
