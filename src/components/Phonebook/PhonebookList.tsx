"use client";

import { useSelector } from "react-redux";
import { PhonebookItem } from "./PhonebookItem";
import { RootState } from "@/redux/store";
import { useGetContactsQuery } from "@/redux/contacts/operations";
import React, { useMemo } from "react";
import { useToast, VStack, Spinner, Flex } from "@chakra-ui/react";

export const PhonebookList: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const toast = useToast();
  const { data, isLoading, error } = useGetContactsQuery();

  const errorHandle = () => {
    if (error && "error" in error) {
      toast({
        position: "top",
        description: error.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const contatctList = useMemo(
    () =>
      data
        ? data
            .filter(({ name }) =>
              name.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => {
              if (a.favorite === true && b.favorite === false) {
                return -1;
              }
              if (b.favorite === true && a.favorite === false) {
                return 1;
              }
              return 0;
            })
            .map(({ name, phone, _id, email, favorite }) => (
              <PhonebookItem
                key={_id}
                id={_id}
                name={name}
                phone={phone}
                data={data}
                email={email}
                favorite={favorite}
              />
            ))
        : [],
    [data, filter]
  );

  return (
    <>
      {isLoading && (
        <Flex alignItems="center" justifyContent="center" pt="12px">
          <Spinner size="xl" />
        </Flex>
      )}
      <VStack listStyleType="none" p="16px 24px">
        {!isLoading &&
          (data?.length ? (
            contatctList
          ) : (
            <li>
              <hr />
              <h3 style={{ textAlign: "center" }}>Nothing here</h3>
            </li>
          ))}
      </VStack>
      {errorHandle()}
    </>
  );
};
