import { ICoin } from "entities/Coin/model/types/coin";
import { baseApi } from "shared/config/api";

export const coinApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopCoins: build.query<ICoin[], {limit: number, tags: string[]}>({
      query: ({ limit, tags }) => ({
        url: `https://api.coinranking.com/v2/coins`,
        params: {
          limit,
          tags,
        },
      }),
      /* eslint-disable */
      transformResponse: (response: any) => {
        const { data } = response;
        return data?.coins;
      },
    }),
  }),
});

export const { useGetTopCoinsQuery } = coinApi;
