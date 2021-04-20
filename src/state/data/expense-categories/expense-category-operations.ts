import { Action } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { Endpoints } from "../../../constants/Endpoints";
import { ExpenseCategory, ExpenseCategoryContract } from "../../../models/expense-category";
import { constructAjaxHeaders } from "../../../util/authentication-utility";
import { ajaxFailure } from "../../session/session-slice";
import {
    createExpenseCategory,
    createExpenseCategorySuccess,
    deleteExpenseCategory,
    deleteExpenseCategorySuccess,
    fetchExpenseCategories,
    fetchExpenseCategoriesSuccess,
    updateExpenseCategory,
    updateExpenseCategorySuccess,
} from "./expense-category-slice";

const FetchExpenseCategories = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(fetchExpenseCategories.match),
    mergeMap(action => ajax.getJSON<ExpenseCategoryContract[]>(Endpoints.ExpenseCategories.FetchExpenseCategories, constructAjaxHeaders())
        .pipe(
            mergeMap(contracts => [
                fetchExpenseCategoriesSuccess(contracts.reduce(
                    (map, e) => map.set(e.id, ExpenseCategory.fromContract(e)),
                    new Map<string, ExpenseCategory>(),
                )),
            ]),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        ),
    ),
);

const CreateExpenseCategory = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(createExpenseCategory.match),
    mergeMap(action => {
        const { url, body } = Endpoints.ExpenseCategories.CreateExpenseCategory(action.payload);
        return ajax.post(url, body, constructAjaxHeaders()).pipe(
            map(res => res.response as ExpenseCategoryContract),
            mergeMap(contract => [createExpenseCategorySuccess(ExpenseCategory.fromContract(contract))]),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        );
    }),
);

const UpdateExpenseCategory = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(updateExpenseCategory.match),
    mergeMap(action => {
        const { url, body } = Endpoints.ExpenseCategories.UpdateExpenseCategory(action.payload.id, action.payload.contract);
        return ajax.put(url, body, constructAjaxHeaders()).pipe(
            map(res => res.response as ExpenseCategoryContract),
            mergeMap(contract => [updateExpenseCategorySuccess(ExpenseCategory.fromContract(contract))]),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        );
    }),
);

const DeleteExpenseCategory = (
    action$: Observable<Action>,
) => action$.pipe(
    filter(deleteExpenseCategory.match),
    mergeMap(action => ajax.delete(Endpoints.ExpenseCategories.DeleteExpenseCategory(action.payload), constructAjaxHeaders())
        .pipe(
            mergeMap(() => [deleteExpenseCategorySuccess(action.payload)]),
            catchError(err => [ajaxFailure({ err, failedAction: action.type })]),
        ),
    ),
);

export const ExpenseCategoryDataEpics = combineEpics(
    FetchExpenseCategories,
    CreateExpenseCategory,
    UpdateExpenseCategory,
    DeleteExpenseCategory,
);
