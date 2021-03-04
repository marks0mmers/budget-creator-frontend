import { Record } from "immutable";
import { User } from "../../models/user";
import { Toast } from "../../util/toast";
import { SessionActions } from "./session-actions";
import { SessionActionTypes as types } from "./session-types";

interface SessionStateContract {
    currentUser?: User;
}

export class SessionState extends Record<SessionStateContract>({
    currentUser: undefined,
}) {}

export const SessionReducer = (
    state = new SessionState(),
    action: SessionActions,
) => {
    switch (action.type) {
    case types.AJAX_FAILURE:
        Toast.ajaxError(action.error);
        return state;
    case types.LOGIN_SUCCESS:
    case types.FETCH_CURRENT_USER_SUCCESS:
        return state.set("currentUser", action.user);
    default: 
        return state;
    }
};
