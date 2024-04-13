export interface ApiError {
    code: number;
    message: string;
}

export interface IApiError {
    data: {message: string};
    status: number;
}
