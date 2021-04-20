export interface ExpenseSubCategoryContract {
    id: string;
    name: string;
    description: string;
}

export type UpsertExpenseSubCategoryContract = Omit<ExpenseSubCategoryContract, "id">

export class ExpenseSubCategory implements ExpenseSubCategoryContract {
    id: string;
    name: string;
    description: string;

    private constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static readonly fromContract = (c: ExpenseSubCategoryContract) => new ExpenseSubCategory(
        c.id,
        c.name,
        c.description,
    )
}
