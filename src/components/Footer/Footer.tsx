import { Container, Link } from "@chakra-ui/react";

export const Footer = () => {
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
      <Link
        href="https://github.com/vaaleerkiin/phonebook-frontend"
        isExternal
        fontWeight="300"
      >
        https://github.com/vaaleerkiin/phonebook-frontend
      </Link>
    </Container>
  );
};
