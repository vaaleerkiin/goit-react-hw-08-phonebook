import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsSlice = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://647615ace607ba4797dd476c.mockapi.io/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: values => ({
        url: 'contacts',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Contacts'],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteContacts: builder.mutation({
      query: Id => ({
        url: `contacts/${Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} = contactsSlice;
