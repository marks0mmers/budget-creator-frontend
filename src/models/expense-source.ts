import { ExpenseCategory, ExpenseCategoryContract } from "./expense-category";
import { ExpenseSubCategory, ExpenseSubCategoryContract } from "./expense-sub-category";

export interface ExpenseSourceContract {
    id: string;
    name: string;
    amount: number;
    expenseCategory: ExpenseCategoryContract;
    expenseSubCategory?: ExpenseSubCategoryContract;
}

export interface UpsertExpenseSourceContract extends Omit<ExpenseSourceContract, "id" | "expenseCategory" | "expenseSubCategory"> {
    expenseCategoryId: string;
    expenseSubCategoryId: string;
}

export interface ExpenseSourceRecord extends Omit<ExpenseSourceContract, "expenseCategory" | "expenseSubCategory"> {
    expenseCategory: ExpenseCategory;
    expenseSubCategory?: ExpenseSubCategory;
}

export class ExpenseSource implements ExpenseSourceRecord {
    id: string;
    name: string;
    amount: number;
    expenseCategory: ExpenseCategory;
    expenseSubCategory?: ExpenseSubCategory;

    private constructor(id: string, name: string, amount: number, expenseCategory: ExpenseCategory, expenseSubCategory?: ExpenseSubCategory) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.expenseCategory = expenseCategory;
        this.expenseSubCategory = expenseSubCategory;
    }

    public static readonly fromContract = (e: ExpenseSourceContract) => new ExpenseSource(
        e.id,
        e.name,
        e.amount,
        ExpenseCategory.fromContract(e.expenseCategory),
        e.expenseSubCategory && ExpenseSubCategory.fromContract(e.expenseSubCategory),
    )
}
