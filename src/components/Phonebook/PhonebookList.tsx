import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { PhonebookItem } from "./PhonebookItem";
import { RootState } from "redux/store";
import { DataType } from "Type/dataType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export const PhonebookList: React.FC<{
  data: DataType[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}> = ({ data, isLoading, error }) => {
  const filter = useSelector((state: RootState) => state.filter);

  const visibleContacts = () => {
    return [...data].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const errorHandle = () => {
    if (error && "error" in error) {
      console.log(error);

      toast.error(error.error);
    }
  };

  return (
    <>
      {isLoading && (
        <BeatLoader
          cssOverride={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
      {data && !isLoading && (
        <ul style={{ width: "100%", padding: 0 }}>
          {visibleContacts().map(({ name, number, id }) => (
            <PhonebookItem
              key={id}
              id={id}
              name={name}
              number={number}
              data={data}
            />
          ))}
        </ul>
      )}

      {errorHandle()}
    </>
  );
};
