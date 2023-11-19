"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AuthErrorHandler } from "../ErrorHandler/AuthErrorHandler";

export const Provides: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CacheProvider>
          <ChakraProvider>
            <AuthErrorHandler>{children}</AuthErrorHandler>
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
};
