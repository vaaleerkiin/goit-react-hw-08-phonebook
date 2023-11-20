import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataType } from "@/types/dataType";
import { FormType } from "@/types/FormType";
import { getSession } from "next-auth/react";
import { BASE_URL } from "@/constants/BASE_URL";
import { axiosBaseQuery } from "@/axiosBaseQuery";

export const contactsAPI = createApi({
  reducerPath: "contactsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<DataType[], void>({
      query: () => ({
        url: "/contacts",
        method: "GET",
      }),
      providesTags: ["Contacts"],
    }),
    addContacts: builder.mutation<DataType, FormType>({
      query: (values) => ({
        url: "/contacts",
        method: "POST",
        data: values,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContacts: builder.mutation<void, string>({
      query: (Id) => ({
        url: `/contacts/${Id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),

    editContacts: builder.mutation<void, { id: string; values: FormType }>({
      query: ({ id, values }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        data: values,
      }),
      invalidatesTags: ["Contacts"],
    }),
    favorite: builder.mutation<void, { id: string; favorite: boolean }>({
      query: ({ id, favorite }) => ({
        url: `/contacts/${id}/favorite`,
        method: "PATCH",
        data: { favorite },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
  useEditContactsMutation,
  useFavoriteMutation,
} = contactsAPI;

export const contactsReducer = contactsAPI.reducer;
