import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinFilterType } from 'entities/Coin/model/consts/coinConsts';

export interface DasboardState {
    type: CoinFilterType,
    _inited: boolean,
    sort: null | string,
}

const initialState: DasboardState = {
  type: CoinFilterType.STABLECOIN,
  _inited: false,
  sort: null,
};

export const dashboardPageSlice = createSlice({
  name: 'dashboardState',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<CoinFilterType>) => {
      state.type = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    initState: (state) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { actions: dashboardPageActions } = dashboardPageSlice;
