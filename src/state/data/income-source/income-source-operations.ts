import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { Action } from "@reduxjs/toolkit";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { createIncomeSource, deleteIncomeSource, updateIncomeSource } from "./income-source-slice";
import { Endpoints } from "../../../constants/Endpoints";
import { ajax } from "rxjs/internal-compatibility";
import { constructAjaxHeaders } from "../../../util/authentication-utility";
import { Budget, BudgetContract } from "../../../models/budget";
import { updateBudgetSuccess } from "../budget/budget-slice";
import { ajaxFailure } from "../../session/session-slice";

const CreateIncomeSourceEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(createIncomeSource.match),
    mergeMap(action => {
        const { budgetId, contract } = action.payload;
        const { url, body } = Endpoints.IncomeSources.CreateIncomeSource(budgetId, contract);
        return ajax.post(url, body, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap(contract => [updateBudgetSuccess(Budget.fromContract(contract))]),
                catchError(err => [ajaxFailure({err, failedAction: action.type})]),
            );
    }),
);

const UpdateIncomeSourceEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(updateIncomeSource.match),
    mergeMap(action => {
        const { budgetId, incomeSourceId, contract } = action.payload;
        const { url, body } = Endpoints.IncomeSources.UpdateIncomeSource(budgetId, incomeSourceId, contract);
        return ajax.put(url, body, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap(contract => [updateBudgetSuccess(Budget.fromContract(contract))]),
                catchError(err => [ajaxFailure({err, failedAction: action.type})]),
            );
    }),
);

const DeleteIncomeSourceEpic = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(deleteIncomeSource.match),
    mergeMap(action => {
        const { budgetId, incomeSourceId } = action.payload;
        const url = Endpoints.IncomeSources.DeleteIncomeSource(budgetId, incomeSourceId);
        return ajax.delete(url, constructAjaxHeaders())
            .pipe(
                map(res => res.response as BudgetContract),
                mergeMap(contract => [updateBudgetSuccess(Budget.fromContract(contract))]),
                catchError(err => [ajaxFailure({err, failedAction: action.type})]),
            );
    }),
);

export const IncomeSourceDataEpics = combineEpics(
    CreateIncomeSourceEpic,
    UpdateIncomeSourceEpic,
    DeleteIncomeSourceEpic,
);
