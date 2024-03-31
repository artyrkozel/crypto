import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserObject } from './types';
import { authApi } from '../api/api';

export interface AuthState {
  isAuthenticated: boolean;
  isForgotPassword: boolean;
  currentUserId: null| string;
  authData?: UserObject;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isForgotPassword: false,
  currentUserId: null,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isAuthenticated = true;
    },
    setAuthData: (state, action: PayloadAction<UserObject>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.authData = JSON.parse(user);
      }
      state.isAuthenticated = true;
    },
    setLoggedOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.postLogin.matchFulfilled, (state, { payload }) => {
      state.currentUserId = payload.id;
      state.isAuthenticated = true;
    });
  },
});

export const { actions: authActions } = authSlice;
