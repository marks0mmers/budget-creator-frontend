import { IncomeSource, IncomeSourceContract } from "./income-source";
import { ExpenseSource, ExpenseSourceContract } from "./expense-source";

export interface BudgetContract {
    id: string;
    title: string;
    primaryUserId: string;
    incomeSources: IncomeSourceContract[];
    expenseSources: ExpenseSourceContract[];
}

export type CreateBudgetContract = Pick<BudgetContract, "title">

export interface UpdateBudgetContract extends CreateBudgetContract {
    id: string;
}

interface BudgetRecordContract extends Omit<BudgetContract, "incomeSources" | "expenseSources"> {
    incomeSources: Map<string, IncomeSource>;
    expenseSources: Map<string, ExpenseSource>;
}

export class Budget implements BudgetRecordContract {
    id: string;
    title: string;
    primaryUserId: string;
    incomeSources: Map<string, IncomeSource>;
    expenseSources: Map<string, ExpenseSource>;

    private constructor(
        id: string,
        title: string,
        primaryUserId: string,
        incomeSources: Map<string, IncomeSource>,
        expenseSources: Map<string, ExpenseSource>,
    ) {
        this.id = id;
        this.title = title;
        this.primaryUserId = primaryUserId;
        this.incomeSources = incomeSources;
        this.expenseSources = expenseSources;
    }

    public static readonly fromContract = (c: BudgetContract) => new Budget(
        c.id,
        c.title,
        c.primaryUserId,
        c.incomeSources.reduce((map, i) => map.set(i.id, IncomeSource.fromContract(i)), new Map<string, IncomeSource>()),
        c.expenseSources.reduce((map, e) => map.set(e.id, ExpenseSource.fromContract(e)), new Map<string, ExpenseSource>()),
    );
}
