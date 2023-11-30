"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { UnauthenticatedHandler } from "../ErrorHandler/UnauthenticatedHandler";

export const Provides: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CacheProvider>
          <ChakraProvider>
            <UnauthenticatedHandler>{children}</UnauthenticatedHandler>
          </ChakraProvider>
        </CacheProvider>
      </Provider>
    </SessionProvider>
  );
};
