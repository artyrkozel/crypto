import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinFilterType } from 'entities/Coin/model/consts/coinConsts';

export interface DasboardState {
    type: CoinFilterType,
    _inited: boolean,
}

const initialState: DasboardState = {
  type: CoinFilterType.POPULAR,
  _inited: false,
};

export const dashboardPageSlice = createSlice({
  name: 'dashboardState',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<CoinFilterType>) => {
      state.type = action.payload;
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
