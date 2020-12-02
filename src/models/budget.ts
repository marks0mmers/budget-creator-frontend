import { Record, RecordOf } from "immutable";

interface IBudget {
    id?: string;
    title: string;
    primaryUserId?: string;
}

export type Budget = RecordOf<IBudget>;
export const Budget = Record<IBudget>({
    id: "",
    title: "",
    primaryUserId: "",
});
