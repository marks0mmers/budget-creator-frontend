import { Record } from "immutable";

export interface IncomeSourceContract {
    id: string;
    name: string;
    amount: number;
}

export type CreateIncomeSourceContract = Omit<IncomeSourceContract, "id">;

export class IncomeSource extends Record<IncomeSourceContract>({
    id: "",
    name: "",
    amount: 0.0,
}) {}
