export interface ICoin {
    uuid: string,
    symbol: string,
    name: string,
    color: string,
    iconUrl: string,
    marketCap: string,
    price: string,
    listedAt: number,
    change: string,
    rank: number,
    sparkline: string[],
    coinrankingUrl: string,
    '24hVolume': string,
    btcPrice: string,
    lowVolume: boolean,
    tier: number
}

export const enum ChartColors {
    POSITIVE = '#1ABC7B',
    NEGATIVE = '#F13005'
}
