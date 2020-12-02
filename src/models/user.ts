import { Record, RecordOf } from "immutable";

interface IUser {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
}

export type User = RecordOf<IUser>;
export const User = Record<IUser>({
    id: undefined,
    username: "",
    firstName: "",
    lastName: "",
    enabled: false,
});

export const getFullNameWithUsername = (user?: User) => user ? `${user.firstName} ${user.lastName} (${user.username})` : "Guest";
