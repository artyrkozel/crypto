import { baseApi } from 'shared/config/api';
import { ApiError } from 'app/types/types';
import { IWallet, IWalletCreate } from '../model/types';

export const walletApi = baseApi.enhanceEndpoints({ addTagTypes: ['Wallet'] }).injectEndpoints({
  endpoints: (build) => ({
    createWallet: build.mutation({
      query: (credentials: IWalletCreate) => ({
        url: 'wallets',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
      invalidatesTags: ['Wallet'],
      transformErrorResponse: async (error: ApiError) => {
        return alert(error.message);
      },
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
        //   dispatch(authActions.setAuthData(data));
        }
      },
    }),

    getWalletByUserId: build.query({
      query: (userId) => ({
        url: `wallets/?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['Wallet'],
      keepUnusedDataFor: Infinity,
      transformResponse: (response: IWallet) => {
        return response;
      },
    }),
  }),
});

export const { useCreateWalletMutation, useGetWalletByUserIdQuery } = walletApi;
