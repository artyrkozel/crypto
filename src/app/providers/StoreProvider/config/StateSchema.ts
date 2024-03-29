import { CombinedState } from '@reduxjs/toolkit/query';
import { AuthState } from 'entities/user/model/slice';

export interface StateSchema {
    baseApi: CombinedState<{}, never, 'baseApi'>;
    authState: AuthState
}
