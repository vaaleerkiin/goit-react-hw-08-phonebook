import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { IUser } from "Type&Intarface/IUser";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        token: string;
        user: Pick<IUser, "email" | "name">;
      },
      Pick<IUser, "email" | "password">
    >({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
        invalidatesTags: ["Auth"],
      }),
    }),
    register: builder.mutation<
      {
        token: string;
        user: Pick<IUser, "email" | "name">;
      },
      Pick<IUser, "email" | "name" | "password">
    >({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
        invalidatesTags: ["Auth"],
      }),
    }),
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/users/current",
        providesTags: ["Auth"],
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        invalidatesTags: ["Auth"],
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation,
} = api;
