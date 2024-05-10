import { CoinState } from "@/entities/Coin/model/slice/slice";
import { WalletState } from "@/entities/Wallet/model/slice";
import { AuthState } from "@/entities/user/model/slice";
import { DasboardState } from "@/pages/DashboardPage/model/slice/dashboardPageSlice";
import { baseApi } from "@/shared/config/api";

export interface StateSchema {
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
    authState: AuthState
    dashboardState : DasboardState
    coinState : CoinState
    walletState: WalletState
}
