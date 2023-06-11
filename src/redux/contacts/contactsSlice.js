import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { number } from 'prop-types';

export const contactsSlice = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: values => ({
        url: '/contacts',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Contacts'],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteContacts: builder.mutation({
      query: Id => ({
        url: `/contacts/${Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    editContacts: builder.mutation({
      query: ({ id, values }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: values,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
  useEditContactsMutation,
} = contactsSlice;
export const contactsReducer = contactsSlice.reducer;
