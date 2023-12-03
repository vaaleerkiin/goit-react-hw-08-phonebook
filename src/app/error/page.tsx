import { BackButton } from "@/components/BackButton/BackButton";
import { Box, Container, Text } from "@chakra-ui/react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Error({ searchParams }: Props) {
  return (
    <Container
      as="section"
      bgColor="#001529"
      pt="50px"
      minH="calc(100vh - 128px)"
      minW="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <BackButton color="white" position="absolute" top="16px" left="16px" />
      <Box
        w="300px"
        h="300px"
        backgroundColor="white"
        clipPath="circle(144px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Text fontWeight={500} fontSize={24} textAlign="center" color="red.500">
          {searchParams.error && (
            <Text as="span" color="black">
              Error:{" "}
            </Text>
          )}
          {searchParams.error}!
        </Text>
      </Box>
    </Container>
  );
}
