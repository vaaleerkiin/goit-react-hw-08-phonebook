"use client";
import { ChakraProps, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

export const BackButton = (props: ChakraProps) => {
  const router = useRouter();
  return (
    <Link
      display="inline-flex"
      alignItems="center"
      gap={1}
      fontSize={18}
      onClick={() => router.back()}
      {...props}
    >
      Back <BsFillArrowLeftSquareFill />
    </Link>
  );
};
