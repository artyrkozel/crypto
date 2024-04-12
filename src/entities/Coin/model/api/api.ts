import { skipToken } from "@reduxjs/toolkit/query";
import { ICoin } from "entities/Coin/model/types/coin";
import { baseApi } from "shared/config/api";

export const coinApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopCoins: build.query<ICoin[], {limit: number, tags: string[], orderBy: string, orderDirection: string}>({
      query: ({ limit, tags, orderBy, orderDirection }) => ({
        url: `https://api.coinranking.com/v2/coins`,
        params: {
          limit,
          tags,
          orderBy,
          orderDirection,
        },
      }),
      transformResponse: (response: { data: { coins: ICoin[] } }) => {
        const { data } = response;
        return data?.coins;
      },
    }),
    getCoinById: build.query<ICoin, {id: typeof skipToken | string, timePeriod?: string}>({
      query: ({ id, timePeriod }) => ({
        url: `https://api.coinranking.com/v2/coin/${id as string}`,
        params: {
          timePeriod,
        },
      }),
      transformResponse: (response: { data: { coin: ICoin } }) => {
        const { data } = response;
        return data?.coin;
      },
    }),

    // tradeCoin: build.mutation({
    //   query: (credentials) => ({
    //     url: 'login',
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: credentials,
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     const { data } = await queryFulfilled;
    //     if (data) {
    //       localStorage.setItem('user', JSON.stringify(data));
    //     }
    //   },
    // }),
  }),
});

export const { useGetTopCoinsQuery, useGetCoinByIdQuery } = coinApi;
