import { Record } from "immutable";

export interface BudgetContract {
    id: string;
    title: string;
    primaryUserId?: string;
}

export type CreateBudgetContract = Omit<BudgetContract, "id" | "primaryUserId">

export class Budget extends Record<BudgetContract>({
    id: "",
    title: "",
    primaryUserId: "",
}) {}
