import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { baseApi } from '@/shared/config/api';
import { authSlice } from '@/entities/user/model/slice';
import { dashboardPageSlice } from '@/pages/DashboardPage/model/slice/dashboardPageSlice';
import { coinSlice } from '@/entities/Coin/model/slice/slice';
import { walletSlice } from '@/entities/Wallet/model/slice';

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [dashboardPageSlice.name]: dashboardPageSlice.reducer,
      [coinSlice.name]: coinSlice.reducer,
      [walletSlice.name]: walletSlice.reducer,
    },
    preloadedState: initialState,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
  });
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
