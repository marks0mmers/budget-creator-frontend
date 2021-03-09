import { CreateBudgetContract, UpdateBudgetContract } from "../models/budget";
import { UpsertIncomeSourceContract } from "../models/income-source";
import { LoginContract } from "../models/user";

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
            url: `/api/budgets/${budgetId}/incomeSources`,
            body,
        }),
        UpdateIncomeSource: (
            budgetId: string,
            incomeSourceId: string,
            body: UpsertIncomeSourceContract,
        ): UrlWithBody<UpsertIncomeSourceContract> => ({
            url: `/api/budgets/${budgetId}/incomeSources/${incomeSourceId}`,
            body,
        }),
        DeleteIncomeSource: (
            budgetId: string,
            incomeSourceId: string,
        ) =>`/api/budgets/${budgetId}/incomeSources/${incomeSourceId}`,
    }
}

