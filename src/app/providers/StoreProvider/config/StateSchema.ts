import { AuthState } from 'entities/user/model/slice';
import { DasboardState } from 'pages/DashboardPage/model/slice/dashboardPageSlice';
import { baseApi } from 'shared/config/api';

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>

    authState: AuthState
    dashboardState : DasboardState
}
