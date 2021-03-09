import { List } from "immutable";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { ajax } from "rxjs/internal-compatibility";
import { Action } from "@reduxjs/toolkit";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { Endpoints } from "../../../constants/Endpoints";
import { Budget, BudgetContract } from "../../../models/budget";
import { constructAjaxHeaders } from "../../../util/authentication-utility";
import {
    createBudget,
    createBudgetSuccess,
    deleteBudget,
    deleteBudgetSuccess,
    fetchAllBudgets,
    fetchAllBudgetsSuccess,
    updateBudget,
    updateBudgetSuccess,
} from "./budget-slice";
import { ajaxFailure } from "../../session/session-slice";
import { setActiveBudget } from "../../control/budget/budget-slice";

const FetchAllBudgetsEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(fetchAllBudgets.match),
    mergeMap(action => ajax.getJSON<BudgetContract[]>(Endpoints.Budgets.FetchAllBudgets, constructAjaxHeaders())
        .pipe(
            mergeMap(contracts => [
                fetchAllBudgetsSuccess(List(contracts.map(Budget.fromContract))
                    .toMap()
                    .mapKeys((_, b) => b.id)
                    .toMap()),
                setActiveBudget(window.localStorage.getItem("activeBudgetId") ?? ""),
            ],
            ),
            catchError(err => [ajaxFailure({err, failedAction: action.type})]),
        ),
    ),
);

const CreateBudgetEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(createBudget.match),
    mergeMap(action => {
        const { url, body } = Endpoints.Budgets.CreateBudget(action.payload);
        return ajax.post(url, body, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap((contract) => [createBudgetSuccess(Budget.fromContract(contract)), setActiveBudget(contract.id)]),
                catchError(err => [ajaxFailure({err, failedAction: action.type})]),
            );
    }),
);

const DeleteBudgetEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(deleteBudget.match),
    mergeMap(action => ajax.delete(Endpoints.Budgets.DeleteBudget(action.payload), constructAjaxHeaders())
        .pipe(
            mergeMap(() => [deleteBudgetSuccess(action.payload), setActiveBudget(undefined)]),
            catchError(err => [ajaxFailure({err, failedAction: action.type})]),
        ),
    ),
);

const UpdateBudgetEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(updateBudget.match),
    mergeMap(action => {
        const { url, body } = Endpoints.Budgets.UpdateBudget(action.payload);
        return ajax.put(url, body, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap(contract => [updateBudgetSuccess(Budget.fromContract(contract))]),
                catchError(err => [ajaxFailure({err, failedAction: action.type})]),
            );
    }),
);

export const BudgetDataEpics = combineEpics(
    FetchAllBudgetsEpic,
    CreateBudgetEpic,
    DeleteBudgetEpic,
    UpdateBudgetEpic,
);
