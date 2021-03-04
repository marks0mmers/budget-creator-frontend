import { CreateBudgetContract } from "../models/budget";
import { LoginContract } from "../models/user";

interface UrlWithBody<T> {
    url: string;
    body: T;
}

export class Endpoints {
    public static readonly FetchCurrentUser = "/api/users/me";
    public static readonly Login = (contract: LoginContract): UrlWithBody<LoginContract> => ({
        url: "/api/users/login",
        body: contract,
    })

    public static readonly FetchAllBudgets = "/api/budgets"
    public static readonly CreateBudget = (contract: CreateBudgetContract): UrlWithBody<CreateBudgetContract> => ({
        url: "/api/budgets",
        body: contract,
    })
    public static readonly DeleteBudget = (budgetId: string) => `/api/budgets/${budgetId}`
}
