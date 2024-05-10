import { skipToken } from "@reduxjs/toolkit/query";
import { ITransaction, ITransactionCreate } from "../types/types";
import { baseApi } from "@/shared/config/api";

export const transactionApi = baseApi.enhanceEndpoints({ addTagTypes: ['TransactionsList'] }).injectEndpoints({
  endpoints: (build) => ({
    getTransactionsList: build.query<ITransaction[], {userId: typeof skipToken | string}>({
      query: ({ userId }) => ({
        url: 'transactions',
        params: { userId },
      }),
      providesTags: ['TransactionsList'],
    }),

    createTransaction: build.mutation({
      query: (createTransaction : ITransactionCreate) => ({
        url: 'transactions',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: createTransaction,
      }),
    }),
  }),
});

export const { useCreateTransactionMutation, useGetTransactionsListQuery } = transactionApi;
