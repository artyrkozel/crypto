import { skipToken } from "@reduxjs/toolkit/query";
import { INotificationCreate } from "../types";
import { baseApi } from "@/shared/config/api";

export const notificationApi = baseApi.enhanceEndpoints({ addTagTypes: ['Notification'] }).injectEndpoints({
  endpoints: (build) => ({
    getNotificationsByUserId: build.query<INotificationCreate[], {userId: typeof skipToken | string}>({
      query: ({ userId }) => ({
        url: 'notification',
        params: { userId },
      }),
      providesTags: ['Notification'],
    }),

    createNotification: build.mutation({
      query: (createNotification : INotificationCreate) => ({
        url: 'notification',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: createNotification,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationsByUserIdQuery, useCreateNotificationMutation } = notificationApi;
