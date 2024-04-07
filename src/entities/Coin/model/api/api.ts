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
    getCoinById: build.query({
      query: (id) => ({
        url: `https://api.coinranking.com/v2/coin/${id}`,
      }),
      transformResponse: (response: { data: { coin: ICoin } }) => {
        const { data } = response;
        return data?.coin;
      },
    }),
  }),
});

export const { useGetTopCoinsQuery, useGetCoinByIdQuery } = coinApi;
