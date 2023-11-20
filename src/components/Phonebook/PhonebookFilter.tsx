"use client";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "@/redux/filterSlice";
import { useSession } from "next-auth/react";

import { RootState } from "@/redux/store";
import { Input } from "@chakra-ui/react";

export const PhonebookFilter: React.FC = () => {
  const session = useSession();
  const state = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  return (
    <>
      {session.status !== "loading" && (
        <Input
          type="text"
          name="filter"
          placeholder="Find contacts by name"
          value={state}
          onChange={(e) => dispatch(changeFilter({ value: e.target.value }))}
        />
      )}
    </>
  );
};
