import { CreateBudgetContract, UpdateBudgetContract } from "../models/budget";
import { UpsertIncomeSourceContract } from "../models/income-source";
import { LoginContract } from "../models/user";
import { UpsertExpenseCategoryContract } from "../models/expense-category";

interface UrlWithBody<T> {
    url: string;
    body: T;
}

export class Endpoints {
    public static readonly Users = {
        FetchCurrentUser: "/api/users/current",
        Login: (contract: LoginContract): UrlWithBody<LoginContract> => ({
            url: "/api/users/login",
            body: contract,
        }),
    }

    public static readonly Budgets = {
        FetchAllBudgets: "/api/budgets",
        CreateBudget: (contract: CreateBudgetContract): UrlWithBody<CreateBudgetContract> => ({
            url: "/api/budgets",
            body: contract,
        }),
        UpdateBudget: (contract: UpdateBudgetContract): UrlWithBody<CreateBudgetContract> => ({
            url: `/api/budgets/${contract.id}`,
            body: {
                title: contract.title,
            },
        }),
        DeleteBudget: (budgetId: string) => `/api/budgets/${budgetId}`,
    }

    public static readonly IncomeSources = {
        CreateIncomeSource: (
            budgetId: string,
            body: UpsertIncomeSourceContract,
        ): UrlWithBody<UpsertIncomeSourceContract> => ({
            url: `/api/budgets/${budgetId}/incomeSource`,
            body,
        }),
        UpdateIncomeSource: (
            budgetId: string,
            incomeSourceId: string,
            body: UpsertIncomeSourceContract,
        ): UrlWithBody<UpsertIncomeSourceContract> => ({
            url: `/api/budgets/${budgetId}/incomeSource/${incomeSourceId}`,
            body,
        }),
        DeleteIncomeSource: (
            budgetId: string,
            incomeSourceId: string,
        ) =>`/api/budgets/${budgetId}/incomeSource/${incomeSourceId}`,
    }

    public static readonly ExpenseCategories = {
        FetchExpenseCategories: "/api/expenseCategories",
        CreateExpenseCategory: (
            body: UpsertExpenseCategoryContract,
        ): UrlWithBody<UpsertExpenseCategoryContract> => ({
            url: "/api/expenseCategories",
            body,
        }),
        UpdateExpenseCategory: (
            expenseCategoryId: string,
            body: UpsertExpenseCategoryContract,
        ): UrlWithBody<UpsertExpenseCategoryContract> => ({
            url: `/api/expenseCategories/${expenseCategoryId}`,
            body,
        }),
        DeleteExpenseCategory: (expenseCategoryId: string) => `/api/expenseCategories/${expenseCategoryId}`,
    }
}

