import { configureStore } from "@reduxjs/toolkit";

import { contactsAPI } from "./contacts/operations";
import { filterReducer } from "./filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [contactsAPI.reducerPath]: contactsAPI.reducer,

      filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contactsAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
