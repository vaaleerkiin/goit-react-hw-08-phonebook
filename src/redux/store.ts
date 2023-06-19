import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactsAPI } from "./contacts/operations";
import { filterReducer } from "./filterSlice";
import { authReducer } from "./Auth/authSlice";
import { authAPI } from "./Auth/operations";

const persistConfig = {
  key: "token",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [contactsAPI.reducerPath]: contactsAPI.reducer,
    auth: persistedReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authAPI.middleware)
      .concat(contactsAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
