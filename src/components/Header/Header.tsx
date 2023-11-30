import { Container, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { HStack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";

import { SignOutButton } from "../Buttons/SignOutButton";

export const Header = ({
  serverSession,
}: {
  serverSession: Session | null;
}) => {
  return (
    <Container
      as="header"
      minW="100%"
      minH={16}
      color="white"
      bg="#001529"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="0 24px"
    >
      <HStack w="100%" as="nav" justifyContent="space-between">
        <Link
          as={NextLink}
          _hover={{ color: "teal.600" }}
          _active={{ color: "teal.700" }}
          fontWeight={500}
          fontSize={24}
          href="/"
        >
          Contacts
        </Link>
        {serverSession && <Text noOfLines={1}>{serverSession.user.name}</Text>}

        {!serverSession && (
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
        {serverSession && <SignOutButton />}
      </HStack>
    </Container>
  );
};
