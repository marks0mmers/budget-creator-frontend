import { SessionActionTypes as types } from "./session-types";
import { AjaxError } from "rxjs/internal-compatibility";
import { User } from "../../models/user";

export const AjaxFailureCreator = (error: AjaxError, failedAction: string) => ({
    error,
    failedAction,
    type: types.AJAX_FAILURE as const,
});

export type AjaxFailure = ReturnType<typeof AjaxFailureCreator>;

export const FetchCurrentUserCreator = () => ({
    type: types.FETCH_CURRENT_USER as const,
});

export type FetchCurrentUser = ReturnType<typeof FetchCurrentUserCreator>;

export const FetchCurrentUserSuccessCreator = (user: User) => ({
    user,
    type: types.FETCH_CURRENT_USER_SUCCESS as const,
});

export const LoginCreator = (username: string, password: string) => ({
    username,
    password,
    type: types.LOGIN as const,
});

export type Login = ReturnType<typeof LoginCreator>;

export const LoginSuccessCreator = (user: User) => ({
    user,
    type: types.LOGIN_SUCCESS as const,
});

export type LoginSuccess = ReturnType<typeof LoginSuccessCreator>;

export type FetchCurrentUserSuccess = ReturnType<typeof FetchCurrentUserSuccessCreator>;

export type SessionActions =
    AjaxFailure |
    Login |
    LoginSuccess |
    FetchCurrentUser |
    FetchCurrentUserSuccess
;
