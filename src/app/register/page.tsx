"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const session = useSession();
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    await signIn("register", {
      name: values.name,
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          console.log(res.error);

          toast({
            position: "top",
            description: JSON.parse(res.error)?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            description: "Success",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .then(() => router.push(callbackUrl));
  };

  return (
    <Container as="section" pt="50px" minH="calc(100vh - 128px)">
      <Box maxW="600px" bgColor="white" borderRadius="12px">
        <Heading textAlign="center" pt="20px" as="h2" size="lg">
          Register
        </Heading>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="16px 24px"
        >
          <FormControl isInvalid={!!errors.name} pb="4px">
            <FormLabel htmlFor="name" fontSize="16px">
              Name
            </FormLabel>

            <Input
              id="name"
              placeholder="Enter name"
              type="text"
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
              placeholder="Enter email"
              type="email"
              {...register("email", {
                required: "This is required",
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
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" fontSize="16px">
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                placeholder="Enter password"
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShow}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
