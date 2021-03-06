import { Action } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { Endpoints } from "../../constants/Endpoints";
import { User, UserContract } from "../../models/user";
import { constructAjaxHeaders } from "../../util/authentication-utility";
import { login, fetchCurrentUser, fetchCurrentUserSuccess, ajaxFailure, loginSuccess } from "./session-slice";

const FetchCurrentUserEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(fetchCurrentUser.match),
    mergeMap(action => ajax.getJSON<UserContract>(Endpoints.Users.FetchCurrentUser, constructAjaxHeaders())
        .pipe(
            mergeMap(contract => [fetchCurrentUserSuccess(User.fromContract(contract))]),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        ),
    ),
);

const LoginEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(login.match),
    mergeMap(action => {
        const { url, body } = Endpoints.Users.Login(action.payload);
        return ajax.post(url, body, constructAjaxHeaders()).pipe(
            map(res => res.response as UserContract & { token?: string }),
            mergeMap(contract => {
                window.localStorage.setItem("jwtToken", contract.token ?? "");
                return [loginSuccess(User.fromContract(contract))];
            }),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        );
    }),
);

export const SessionEpics = combineEpics(
    FetchCurrentUserEpic,
    LoginEpic,
);
