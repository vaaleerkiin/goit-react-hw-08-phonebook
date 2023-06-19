import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { DataType } from "Type&Intarface/dataType";
import { FormType } from "Type&Intarface/FormType";

export const contactsAPI = createApi({
  reducerPath: "contactsApi",
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
        method: "PATCH",
        body: values,
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
} = contactsAPI;
export const contactsReducer = contactsAPI.reducer;
