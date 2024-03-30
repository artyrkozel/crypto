import { baseApi } from 'shared/config/api';
import { removeCookies, setCookies } from 'shared/lib/utils';
import { LoginFormData, UserObject, UserWithToken } from '../model/types';

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
        setCookies({ accessToken });
        return response.user;
      },
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   const { data } = await queryFulfilled;
      //   if (data) {
      //     dispatch(authApi.util.upsertQueryData('getCurrentUser', undefined, data));
      //   }
      // },
    }),

    postLogout: build.mutation<{ message: string }, { token: string }>({
      query: (credentials) => ({
        url: 'auth/logout',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data) {
          removeCookies();
        }
      },
    }),

    getUserById: build.query({
      query: (id) => ({
        url: 'users/id'.replace('id', JSON.parse(id)),
        method: 'GET',
      }),
      keepUnusedDataFor: Infinity,
      transformResponse: (response: UserObject) => {
        return response;
      },
    }),

  }),
});

export const {
  usePostLoginMutation,
  useGetUserByIdQuery,
} = authApi;
