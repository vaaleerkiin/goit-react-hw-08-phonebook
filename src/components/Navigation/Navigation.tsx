"use client";

import NextLink from "next/link";
import { Link } from "@chakra-ui/next-js";
import { Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const Navigation = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <HStack w="100%" as="nav" justifyContent="space-between">
      <Link
        as={NextLink}
        color={pathname == "/" ? "teal.500" : "white"}
        _hover={{ color: "teal.600" }}
        _active={{ color: "teal.700" }}
        fontWeight={500}
        fontSize={24}
        href="/"
      >
        Contacts
      </Link>
      {session.status !== "loading" && session.status == "authenticated" && (
        <Text noOfLines={1}>{session.data.user.name}</Text>
      )}
      {session.status === "loading" && <Spinner size="lg" />}
      {session.status !== "loading" && session.status !== "authenticated" && (
        <HStack as="div">
          <Link
            as={NextLink}
            bgColor="#3182ce"
            _hover={{ bgColor: "#2b6cb0" }}
            _active={{ bgColor: "#2c5282" }}
            fontWeight={500}
            borderRadius={4}
            p="8px 16px"
            href="/login"
          >
            Login
          </Link>
          <Link
            as={NextLink}
            bgColor="#3182ce"
            _hover={{ bgColor: "#2b6cb0" }}
            _active={{ bgColor: "#2c5282" }}
            fontWeight={500}
            borderRadius={4}
            p="8px 16px"
            href="/register"
          >
            Register
          </Link>
        </HStack>
      )}
      {session.status !== "loading" && session.status === "authenticated" && (
        <Button colorScheme="blue" onClick={() => signOut()}>
          Sign Out
        </Button>
      )}
    </HStack>
  );
};
