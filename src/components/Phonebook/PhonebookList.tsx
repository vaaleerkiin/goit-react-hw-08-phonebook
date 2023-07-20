import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { PhonebookItem } from "./PhonebookItem";
import { RootState } from "redux/store";
import { useGetContactsQuery } from "redux/contacts/operations";
import { DataType } from "Type&Intarface/dataType";

export const PhonebookList: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { data, isLoading, error } = useGetContactsQuery();
  const visibleContacts = (): DataType[] | [] => {
    return data
      ? data.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
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
      <ul style={{ width: "100%", padding: 0 }}>
        {!isLoading &&
          (data?.length ? (
            visibleContacts().map(({ name, phone, _id, email }) => (
              <PhonebookItem
                key={_id}
                id={_id}
                name={name}
                phone={phone}
                data={data}
                email={email}
              />
            ))
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
