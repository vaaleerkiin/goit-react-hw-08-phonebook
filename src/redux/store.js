import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    [contactsSlice.reducerPath]: contactsSlice.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsSlice.middleware),
});
