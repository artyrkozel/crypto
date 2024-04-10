import { baseApi } from 'shared/config/api';
import { setCookies } from 'shared/lib/utils';
import { LeaderUser, LoginFormData, UserObject, UserWithToken } from '../model/types';
import { authActions } from '../model/slice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<UserObject, LoginFormData>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      }),
      transformResponse: (response: UserWithToken) => {
        const { accessToken } = response;
        // const date = new Date();
        // date.setTime(date.getTime() + 30 * 1000);
        accessToken && setCookies({ accessToken });
        return response.user;
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          dispatch(authActions.setAuthData(data));
        }
      },
    }),

    getUserById: build.query({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: Infinity,
      transformResponse: (response: UserObject) => {
        return response;
      },
    }),

    getLeaderboard: build.query({
      query: () => ({
        url: 'leaders',
        method: 'GET',
      }),
      keepUnusedDataFor: Infinity,
      transformResponse: (response: LeaderUser[]) => {
        return response;
      },
    }),

  }),
});

export const {
  usePostLoginMutation,
  useGetUserByIdQuery,
  useGetLeaderboardQuery,
} = authApi;
