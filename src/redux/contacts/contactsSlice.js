import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
      providesTags: ['Contacts', 'Auth'],
    }),
    addContacts: builder.mutation({
      query: values => ({
        url: '/contacts',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Contacts', 'Auth'],
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteContacts: builder.mutation({
      query: Id => ({
        url: `/contacts/${Id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts', 'Auth'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} = contactsSlice;
export const contactsReducer = contactsSlice.reducer;
