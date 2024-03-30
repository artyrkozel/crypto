import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const _baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, {}, {}>;

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: _baseQuery,
  endpoints: () => ({}),
});
