import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDeleteContactsMutation } from "redux/contacts/operations";
import { PhonebookModal } from "./PhonebookModal";
import { DataType } from "Type&Intarface/dataType";
import { ContactWrap, UserWrap } from "./Phonebook.styled";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

interface IProps {
  name: string;
  phone: string;
  id: string;
  data: DataType[];
  email: string;
}

export const PhonebookItem: React.FC<IProps> = ({
  name,
  phone,
  email,
  id,
  data,
}) => {
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
        <ContactWrap>
          <UserWrap>
            <span>{name}:</span>
            <span>{phone}</span>
          </UserWrap>
          <Button
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
          <Button
            type="primary"
            style={{ backgroundColor: "#4BB543" }}
            icon={<PhoneOutlined />}
            size="large"
            href={`tel:${phone}`}
          />
          {email && (
            <Button
              type="primary"
              icon={<MailOutlined />}
              size="large"
              href={`mailto:${email}`}
            />
          )}
        </ContactWrap>
      </li>
      <PhonebookModal
        open={isModalOpen}
        toogleModal={toogleModal}
        id={id}
        name={name}
        phone={phone}
        data={data}
        email={email}
      />
    </>
  );
};
