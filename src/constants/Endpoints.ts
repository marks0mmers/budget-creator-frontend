import { CreateBudgetContract } from "../models/budget";
import { LoginContract } from "../models/user";
import { CreateBudget, DeleteBudget } from "../state/data/budget/budget-actions";
import { Login } from "../state/session/session-actions";

interface UrlWithBody<T> {
    url: string;
    body: T;
}

export class Endpoints {
    public static readonly FetchCurrentUser = "/api/users/me";
    public static readonly Login = (action: Login): UrlWithBody<LoginContract> => ({
        url: "/api/users/login",
        body: {
            username: action.username,
            password: action.password,
        },
    })

    public static readonly FetchAllBudgets = "/api/budgets"
    public static readonly CreateBudget = (action: CreateBudget): UrlWithBody<CreateBudgetContract> => ({
        url: "/api/budgets",
        body: action.budget,
    })
    public static readonly DeleteBudget = (action: DeleteBudget) => `/api/budgets/${action.budgetId}`
}
