import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { IUser } from "Type&Intarface/IUser";

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://phonebook-0e5s.onrender.com/api",
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
        user: Pick<IUser, "email" | "name" | "avatarURL">;
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
        user: Pick<IUser, "email" | "name" | "avatarURL">;
      },
      Pick<IUser, "email" | "name" | "password">
    >({
      query: (credentials) => ({
        url: "/users/register",
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
} = authAPI;
