import { baseApi } from 'shared/config/api';
import { setCookies } from 'shared/lib/utils';
import { ApiError } from 'app/types/globals';
import { LoginFormData, UserObject, UserWithToken } from '../model/types';
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
      transformErrorResponse: async (error: ApiError) => {
        return alert(error.message);
      },
      transformResponse: (response: UserWithToken) => {
        const { accessToken } = response;
        setCookies({ accessToken });
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

  }),
});

export const {
  usePostLoginMutation,
  useGetUserByIdQuery,
} = authApi;
