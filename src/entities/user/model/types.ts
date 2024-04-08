export type UserObject = {
    email: string;
    id: string;
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

export type LeaderUser = {
    changePersent: number;
    name: string;
}
