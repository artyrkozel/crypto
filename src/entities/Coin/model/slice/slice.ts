import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOptions } from 'shared/ui/Dropdown/Dropdown';
import { ICoin } from '../types/coin';

export interface CoinState {
    coinToTrade: ICoin | null;
    tradeCoinId: string | null;
    coinsOptions: IOptions[];
}

const initialState: CoinState = {
  coinToTrade: null,
  tradeCoinId: null,
  coinsOptions: [],
};

export const coinSlice = createSlice({
  name: 'coinState',
  initialState,
  reducers: {
    setCoinToBuy: (state, action: PayloadAction<ICoin>) => {
      state.coinToTrade = action.payload;
    },
    setTradeCoinId: (state, action: PayloadAction<string>) => {
      state.tradeCoinId = action.payload;
    },
    setCoinsOptions: (state, action: PayloadAction<IOptions[]>) => {
      state.coinsOptions = action.payload;
    },
  },
});

export const { actions: coinActions } = coinSlice;
