import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiError } from 'app/types/types';
import Cookies from 'js-cookie';
import { alert } from 'widgets/Notification';

const _baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },

}) as BaseQueryFn<string | FetchArgs, unknown, {}, {}>;

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  {},
  {}
> = async (args, api, extraOptions) => {
  const result = await _baseQuery(args, api, extraOptions);
  if (result.error) {
    const error = result.error as IApiError;
    alert({ type: 'error', message: error.data.message });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
