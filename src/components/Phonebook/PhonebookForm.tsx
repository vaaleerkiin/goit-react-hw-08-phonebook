"use client";

import { useEffect } from "react";

import {
  useGetContactsQuery,
  useAddContactsMutation,
} from "@/redux/contacts/operations";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

export const PhonebookForm: React.FC = () => {
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [postContatct, { isSuccess, isError }] = useAddContactsMutation();
  const { data } = useGetContactsQuery();

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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values, e) => {
    if (
      data &&
      data.some((el) => values.name.toLowerCase() === el.name.toLowerCase())
    ) {
      toast({
        position: "top",
        description: `${values.name} is already in contacts`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else {
      postContatct(values);
    }

    onClose();
    reset();
  };
  return (
    <>
      {session.status !== "loading" && (
        <Button onClick={onOpen}>Add contact</Button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.name} pb="4px">
              <FormLabel htmlFor="name" fontSize="16px">
                Name *
              </FormLabel>

              <Input
                id="name"
                placeholder="Enter name"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} pb="4px">
              <FormLabel htmlFor="email" fontSize="16px">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel htmlFor="phone" fontSize="16px">
                Phone *
              </FormLabel>

              <Input
                id="phone"
                placeholder="Enter phone"
                type="tel"
                {...register("phone", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>
            <ModalFooter as="div">
              <Button
                colorScheme="blue"
                isLoading={isSubmitting}
                mr={3}
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
