import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const SelectCurrentUserId = (state: StateSchema) => state.authState.currentUserId;
