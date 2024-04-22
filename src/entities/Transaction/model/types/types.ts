export interface ITransactionCreate {
    date: Date;
    userId: string;
    status: 'ok' | 'error';
    coinName: string;
    coinSymbol: string;
    usdSum: number;
    coinSum: number;
    type: 'withdraw' | 'deposit' | 'exchange';
}

export type ITransaction = ITransactionCreate & {id: number}
