import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { CoinFilterType } from "@/entities/Coin/model/consts/coinConsts";

export const getArticlesPageType = (state: StateSchema) => state.dashboardState?.type ?? CoinFilterType.STABLECOIN;

export const getSortType = (state: StateSchema) => state.dashboardState?.sort;

export const getTradeCoinId = (state: StateSchema) => state.dashboardState?.tradeCoinsId;
