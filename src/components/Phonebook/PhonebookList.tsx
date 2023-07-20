import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { PhonebookItem } from "./PhonebookItem";
import { RootState } from "redux/store";
import { useGetContactsQuery } from "redux/contacts/operations";
import React, { useMemo } from "react";

export const PhonebookList: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { data, isLoading, error } = useGetContactsQuery();

  const errorHandle = () => {
    if (error && "error" in error) {
      console.log(error);

      toast.error(error.error);
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
        <BeatLoader
          cssOverride={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
      <ul style={{ width: "100%", padding: 0 }}>
        {!isLoading &&
          (data?.length ? (
            contatctList
          ) : (
            <li>
              <hr />
              <h3 style={{ textAlign: "center" }}>Nothing here</h3>
            </li>
          ))}
      </ul>
      {errorHandle()}
    </>
  );
};
