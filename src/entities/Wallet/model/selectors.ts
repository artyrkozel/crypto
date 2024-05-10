import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getWalletData = (state: StateSchema) => state.walletState.walletData;

export const getWalletCurrency = (state: StateSchema) => state.walletState.walletData?.currencies ?? [];
