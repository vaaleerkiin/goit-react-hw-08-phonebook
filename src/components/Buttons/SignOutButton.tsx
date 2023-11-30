"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export const SignOutButton = () => (
  <Button colorScheme="blue" onClick={() => signOut()}>
    Sign Out
  </Button>
);
