interface ICurrency {
    name: string;
    value: number
}

export type IWallet = {
    id: number;
    userId: string;
    currencies: ICurrency[]
}

export type IWalletCreate = Omit<IWallet, 'id'>
