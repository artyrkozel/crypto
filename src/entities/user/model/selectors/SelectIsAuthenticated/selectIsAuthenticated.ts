import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const selectIsAuthenticated = (state: StateSchema) => state.authState.isAuthenticated;
