export interface IWalletCurrency {
    name: string;
    value: number;
    iconUrl: string;
    symbol: string;
}

export type IWallet = {
    id: number;
    userId: string;
    currencies: IWalletCurrency[];
    totalValue: number;
}

export type IWalletCreate = Omit<IWallet, 'id'>

export interface IWalletCoin {
    id: number;
    currency: string;
    iconUrl: string;
    symbol: string;
    value: number;
}
