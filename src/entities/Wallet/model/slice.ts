import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWallet } from './types';

export interface WalletState {
    walletData: null | IWallet;
}

const initialState: WalletState = {
  walletData: null,
};

export const walletSlice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {
    setWalletData: (state, action: PayloadAction<IWallet>) => {
      state.walletData = action.payload;
    },
  },
});

export const { actions: walletActions } = walletSlice;
