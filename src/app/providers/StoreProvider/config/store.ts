import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'shared/config/api';
import { authSlice } from 'entities/user/model/slice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
