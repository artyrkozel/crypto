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
      // async onQueryStarted(_, { queryFulfilled }) {
      //   const { data } = await queryFulfilled;
      //   if (data) {
      //     console.log(data);
      //   }
      //   // if (data) {
      //   //   dispatch(authApi.util.upsertQueryData('getMe', undefined, data));
      //   // }
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
  }),
});

export const {
  usePostLoginMutation,
} = authApi;
