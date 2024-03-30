import { AuthState } from 'entities/user/model/slice';
import { baseApi } from 'shared/config/api';

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
    authState: AuthState
}
