import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCoinsOptions = (state: StateSchema) => state.coinState.coinsOptions;
