import { Record } from "immutable";

interface IBudget {
    id?: string;
    title: string;
    primaryUserId?: string;
}

export class Budget extends Record<IBudget>({
    id: "",
    title: "",
    primaryUserId: "",
}) {}
