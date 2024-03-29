import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/api';


export interface AuthState {
  isAuthenticated: boolean;
  isForgotPassword: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isForgotPassword: false,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isAuthenticated = true;
    },
    setLoggedOut: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.postLogin.matchFulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { setLoggedOut } = authSlice.actions;