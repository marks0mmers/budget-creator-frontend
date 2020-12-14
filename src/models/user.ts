import { Record } from "immutable";

interface UserContract {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
}

export class User extends Record<UserContract>({
    id: undefined,
    username: "",
    firstName: "",
    lastName: "",
    enabled: false,
}) {
    public get fullName() {
        return `${this.firstName} ${this.lastName} (${this.username})`;
    }
}
