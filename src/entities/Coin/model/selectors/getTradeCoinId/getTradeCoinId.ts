import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getTradeCoinId = (state: StateSchema) => state.coinState.tradeCoinId;
