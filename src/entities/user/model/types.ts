export type UserObject = {
    email: string;
    name: string;
};

export type LoginFormData = {
    email: string;
    password: string;
};

export type TokenObject = {
    accessToken: string;
};

export type UserWithToken = TokenObject & {
    user: UserObject;
};