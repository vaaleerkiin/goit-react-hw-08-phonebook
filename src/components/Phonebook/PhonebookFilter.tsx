"use client";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "@/redux/filterSlice";

import { RootState } from "@/redux/store";
import { Input } from "@chakra-ui/react";

export const PhonebookFilter: React.FC = () => {
  const state = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  return (
    <Input
      type="text"
      name="filter"
      placeholder="Find contacts by name"
      value={state}
      onChange={(e) => dispatch(changeFilter({ value: e.target.value }))}
    />
  );
};
