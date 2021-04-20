export interface LoginContract {
    username: string;
    password: string;
}

export interface UserContract {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
}

export class User implements UserContract {
    id?: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    username: string;

    private constructor(enabled: boolean, firstName: string, lastName: string, username: string, id?: string) {
        this.id = id;
        this.enabled = enabled;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }

    public static readonly fromContract = (c: UserContract) => new User(
        c.enabled,
        c.firstName,
        c.lastName,
        c.username,
        c.id,
    )

    public get fullName() {
        return `${this.firstName} ${this.lastName} (${this.username})`;
    }
}
