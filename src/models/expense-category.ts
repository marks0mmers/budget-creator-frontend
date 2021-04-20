import { ExpenseSubCategory, ExpenseSubCategoryContract } from "./expense-sub-category";

export interface ExpenseCategoryContract {
    id: string;
    name: string;
    description: string;
    subCategories: ExpenseSubCategoryContract[];
}

export type UpsertExpenseCategoryContract = Omit<ExpenseCategoryContract, "id" | "subCategories">

export interface ExpenseCategoryRecord extends Omit<ExpenseCategoryContract, "subCategories"> {
    subCategories: Map<string, ExpenseSubCategory>;
}

export class ExpenseCategory implements ExpenseCategoryRecord {
    id: string;
    name: string;
    description: string;
    subCategories: Map<string, ExpenseSubCategory>;

    private constructor(id: string, name: string, description: string, subCategories: Map<string, ExpenseSubCategory>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subCategories = subCategories;
    }

    public static readonly fromContract = (e: ExpenseCategoryContract) => new ExpenseCategory(
        e.id,
        e.name,
        e.description,
        e.subCategories.reduce((map, e) => map.set(e.id, ExpenseSubCategory.fromContract(e)), new Map<string, ExpenseSubCategory>()),
    )
}
