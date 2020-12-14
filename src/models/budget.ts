import { Record } from "immutable";

export interface BudgetContract {
    id?: string;
    title: string;
    primaryUserId?: string;
}

export class Budget extends Record<BudgetContract>({
    id: "",
    title: "",
    primaryUserId: "",
}) {}
