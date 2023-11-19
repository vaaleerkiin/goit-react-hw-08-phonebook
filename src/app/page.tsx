import { PhonebookFilter } from "@/components/Phonebook/PhonebookFilter";
import { PhonebookForm } from "@/components/Phonebook/PhonebookForm";
import { PhonebookList } from "@/components/Phonebook/PhonebookList";
import { Container, Flex, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container
      as="section"
      bgColor="transparent"
      pt="50px"
      minH="calc(100vh - 128px)"
      maxW="800px"
      w="100%"
    >
      <Container
        bgColor="white"
        borderRadius="12px"
        p="16px 24px"
        maxW="800px"
        w="100%"
      >
        <Flex
          gap="8px"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PhonebookForm />
          <Text fontSize="2xl" fontWeight="500">
            Contacts
          </Text>
          <PhonebookFilter />
        </Flex>
        <PhonebookList />
      </Container>
    </Container>
  );
}
