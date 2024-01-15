import { useEffect } from "react";

import {
  useDeleteContactsMutation,
  useFavoriteMutation,
} from "@/redux/contacts/operations";
import { PhonebookModal } from "./PhonebookModal";
import { DataType } from "@/types/dataType";

import { Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import { StarIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";

interface IProps {
  name: string;
  phone: string;
  id: string;
  data: DataType[];
  email: string;
  favorite: boolean;
}

export const PhonebookItem: React.FC<IProps> = ({
  name,
  phone,
  email,
  favorite,
  id,
  data,
}) => {
  const toast = useToast();
  const [toogleFavorite] = useFavoriteMutation();
  const [deleteContatctById, { isLoading, isSuccess, isError }] =
    useDeleteContactsMutation();

  useEffect(() => {
    if (isError) {
      toast({
        position: "top",
        description: "Fail",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        position: "top",
        description: "Success",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isSuccess, toast]);

  return (
    <>
      <Flex
        as="li"
        w="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        gap="6px"
      >
        <HStack justifyContent="center">
          <Text size="lg">{name}: </Text>
          <Text flex="1" size="lg" noOfLines={1}>
            {phone}
          </Text>
        </HStack>
        <HStack justifyContent="center" flexWrap="wrap">
          <Button
            onClick={() => {
              toogleFavorite({ id, favorite: !favorite });
            }}
          >
            <StarIcon color={favorite ? "yellow.300" : "gray.300"} />
          </Button>
          <PhonebookModal
            name={name}
            data={data}
            id={id}
            email={email}
            phone={phone}
          />
          <Button
            colorScheme="red"
            isLoading={isLoading}
            onClick={() => {
              deleteContatctById(id);
            }}
          >
            Delete
          </Button>
          <Button as="a" colorScheme="green" href={`tel:${phone}`}>
            <PhoneIcon />
          </Button>
          {email && (
            <Button as="a" colorScheme="blue" href={`mailto:${email}`}>
              <EmailIcon />
            </Button>
          )}
        </HStack>
      </Flex>
    </>
  );
};
