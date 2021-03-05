import { List, Map, Record } from "immutable";
import { IncomeSource, IncomeSourceContract } from "./income-source";

export interface BudgetContract {
    id: string;
    title: string;
    primaryUserId: string;
    incomeSources: IncomeSourceContract[];
}

interface BudgetRecordContract extends Omit<BudgetContract, "incomeSources"> {
    incomeSources: Map<string, IncomeSource>;
}

export type CreateBudgetContract = Pick<BudgetContract, "title">
export interface UpdateBudgetContract extends CreateBudgetContract {
    id: string;
}

export class Budget extends Record<BudgetRecordContract>({
    id: "",
    title: "",
    primaryUserId: "",
    incomeSources: Map(),
}) {
    public static readonly fromContract = (c: BudgetContract) => new Budget({
        id: c.id,
        title: c.title,
        primaryUserId: c.primaryUserId,
        incomeSources: List(c.incomeSources.map(i => new IncomeSource(i)))
            .toMap()
            .mapKeys((_, i) => i.id)
            .toMap(),
    })
}
