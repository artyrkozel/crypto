import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoin } from '../types/coin';

export interface CoinState {
    coinToTrade: ICoin | null
}

const initialState: CoinState = {
  coinToTrade: null,
};

export const coinSlice = createSlice({
  name: 'coinState',
  initialState,
  reducers: {
    setCoinToBuy: (state, action: PayloadAction<ICoin>) => {
      state.coinToTrade = action.payload;
    },
  },
});

export const { actions: coinActions } = coinSlice;
