import { configureStore } from "@reduxjs/toolkit";

import { contactsAPI } from "./contacts/operations";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    [contactsAPI.reducerPath]: contactsAPI.reducer,

    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
