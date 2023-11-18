import { Box, Container } from "@chakra-ui/react";
import { Navigation } from "../Navigation/Navigation";

export const Header = () => (
  <Container
    as="header"
    minW="100%"
    minH={16}
    color="white"
    bg="#001529"
    display="flex"
    alignItems='center'
    justifyContent='center'
    p='0 24px'
  >
    <Navigation />
  </Container>
);
