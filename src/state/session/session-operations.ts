import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { ajax } from "rxjs/internal-compatibility";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Endpoints } from "../../constants/Endpoints";
import { User, UserContract } from "../../models/user";
import { constructAjaxHeaders } from "../../util/authentication-utility";
import { AjaxFailureCreator, FetchCurrentUser, FetchCurrentUserSuccessCreator, Login, LoginSuccessCreator } from "./session-actions";
import { SessionActionTypes } from "./session-types";

const FetchCurrentUserEpic = (
    action$: Observable<FetchCurrentUser>,
) => action$.pipe(
    ofType<FetchCurrentUser>(SessionActionTypes.FETCH_CURRENT_USER),
    mergeMap(action => ajax.getJSON<UserContract>(Endpoints.FetchCurrentUser, constructAjaxHeaders())
        .pipe(
            mergeMap(contract => [FetchCurrentUserSuccessCreator(new User(contract))]),
            catchError(err => [AjaxFailureCreator(err, action.type)]),
        ),
    ),
);

export const LoginEpic = (
    action$: Observable<Login>,
) => action$.pipe(
    ofType(SessionActionTypes.LOGIN),
    mergeMap(action => {
        const { url, body } = Endpoints.Login(action);
        return ajax.post(url, body, constructAjaxHeaders()).pipe(
            map(res => res.response as UserContract & { token?: string }),
            mergeMap(contract => {
                window.localStorage.setItem("jwtToken", contract.token ?? "");
                return [LoginSuccessCreator(new User(contract))];
            }),
            catchError(err => [AjaxFailureCreator(err, action.type)]),
        );
    }),
);

export const SessionEpics = combineEpics(
    FetchCurrentUserEpic,
    LoginEpic,
);
