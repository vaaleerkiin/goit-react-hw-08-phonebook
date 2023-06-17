import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDeleteContactsMutation } from "redux/contacts/contactsSlice";
import { PhonebookModal } from "./PhonebookModal";
import { DataType } from "Type/dataType";

export const PhonebookItem: React.FC<{
  name: string;
  number: string;
  id: string;
  data: DataType[];
}> = ({ name, number, id, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteContatctById, { isLoading, isSuccess, isError }] =
    useDeleteContactsMutation();

  const toogleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Fail");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
    }
  }, [isSuccess]);

  return (
    <>
      <li>
        <hr />
        <div>
          {name}: {number}
          <Button
            style={{ marginLeft: "auto" }}
            loading={isLoading}
            disabled={isLoading}
            size="large"
            onClick={toogleModal}
          >
            Edit
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            size="large"
            onClick={() => {
              deleteContatctById(id);
            }}
          >
            Delete
          </Button>
        </div>
      </li>
      <PhonebookModal
        open={isModalOpen}
        toogleModal={toogleModal}
        id={id}
        name={name}
        number={number}
        data={data}
      />
    </>
  );
};
