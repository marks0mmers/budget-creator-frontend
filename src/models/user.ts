import { Record } from "immutable";

interface IUser {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
}

export class User extends Record<IUser>({
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
