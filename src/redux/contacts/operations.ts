import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataType } from "@/types/dataType";
import { FormType } from "@/types/FormType";
import { getSession } from "next-auth/react";
import { BASE_URL } from "@/constants/BASE_URL";

export const contactsAPI = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();

      if (session) {
        headers.set("authorization", `Bearer ${session.user.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<DataType[], void>({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    addContacts: builder.mutation<DataType, FormType>({
      query: (values) => ({
        url: "/contacts",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Contacts"],
      transformResponse: (response: { data: DataType }) => response.data,
      transformErrorResponse: (response) => response.status,
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
        body: values,
      }),
      invalidatesTags: ["Contacts"],
    }),
    favorite: builder.mutation<void, { id: string; favorite: boolean }>({
      query: ({ id, favorite }) => ({
        url: `/contacts/${id}/favorite`,
        method: "PATCH",
        body: { favorite },
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
