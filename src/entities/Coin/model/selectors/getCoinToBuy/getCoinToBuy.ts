import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getCoinToBuy = (state: StateSchema) => state.coinState.coinToTrade;
