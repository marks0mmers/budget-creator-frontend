import { List } from "immutable";
import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { ajax } from "rxjs/internal-compatibility";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Endpoints } from "../../../constants/Endpoints";
import { Budget, BudgetContract } from "../../../models/budget";
import { constructAjaxHeaders } from "../../../util/authentication-utility";
import { SetActiveBudgetCreator } from "../../control/budget/budget-actions";
import { AjaxFailureCreator } from "../../session/session-actions";
import {
    CreateBudget,
    CreateBudgetSuccessCreator,
    DeleteBudget,
    DeleteBudgetSuccessCreator,
    FetchAllBudgets,
    FetchAllBudgetsSuccessCreator,
} from "./budget-actions";
import { BudgetDataActionTypes as types } from "./budget-types";

export const FetchAllBudgetsEpic = (
    action$: Observable<FetchAllBudgets>,
) => action$.pipe(
    ofType(types.FETCH_ALL_BUDGETS),
    mergeMap(action => ajax.getJSON<BudgetContract[]>(Endpoints.FetchAllBudgets, constructAjaxHeaders())
        .pipe(
            mergeMap(contracts => [FetchAllBudgetsSuccessCreator(List(contracts.map(c => new Budget(c)))
                .toMap()
                .mapKeys((_, b) => b.id)
                .toMap())],
            ),
            catchError(err => [AjaxFailureCreator(err, action.type)]),
        ),
    ),
);

export const CreateBudgetEpic = (
    action$: Observable<CreateBudget>,
) => action$.pipe(
    ofType(types.CREATE_BUDGET),
    mergeMap(action => {
        const { url, body } = Endpoints.CreateBudget(action);
        return ajax.post(url, body, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap((contract) => [CreateBudgetSuccessCreator(new Budget(contract)), SetActiveBudgetCreator(contract.id)]),
                catchError(err => [AjaxFailureCreator(err, action.type)]),
            );
    }),
);

export const DeleteBudgetEpic = (
    action$: Observable<DeleteBudget>,
) => action$.pipe(
    ofType(types.DELETE_BUDGET),
    mergeMap(action => ajax.delete(Endpoints.DeleteBudget(action), constructAjaxHeaders())
        .pipe(
            mergeMap(() => [DeleteBudgetSuccessCreator(action.budgetId), SetActiveBudgetCreator(undefined)]),
            catchError(err => [AjaxFailureCreator(err, action.type)]),
        ),
    ),
);

export const BudgetDataEpics = combineEpics(
    FetchAllBudgetsEpic,
    CreateBudgetEpic,
    DeleteBudgetEpic,
);
