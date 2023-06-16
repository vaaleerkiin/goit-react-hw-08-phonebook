import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { ButtonWrap } from "./Phonebook.styled";
import { useAddContactsMutation } from "redux/contacts/contactsSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IData } from "Type/dataType";
import { IFormValue } from "Type/FormType";

export const PhonebookForm: React.FC<{ data: IData[] }> = ({ data }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContatct, { isSuccess, isError }] = useAddContactsMutation();

  const toogleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const onFinish = (values: IFormValue) => {
    toogleModal();
    form.resetFields();
    if (
      data.some((el) =>
        values.name.toLowerCase().includes(el.name.toLowerCase())
      )
    ) {
      toast.error(`${values.name} is already in contacts`);
      return;
    } else {
      postContatct(values);
    }
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
      <ButtonWrap>
        <span>Add contact</span>
        <Button
          type="primary"
          style={{ backgroundColor: "#4BB543" }}
          icon={<PlusOutlined />}
          size="large"
          onClick={toogleModal}
        />
      </ButtonWrap>
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Add contact</h3>}
        open={isModalOpen}
        onOk={toogleModal}
        onCancel={toogleModal}
        footer={null}
      >
        <Form
          form={form}
          name="create"
          labelCol={{ span: 4 }}
          style={{ maxWidth: 600 }}
          initialValues={{ name: "", number: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "" },
              {
                validator: async (_, names) => {
                  if (!names) {
                    return Promise.reject(new Error("Please input your Name!"));
                  } else if (
                    names.trim().length < 6 ||
                    names.trim().length > 10
                  ) {
                    return Promise.reject(
                      new Error(
                        "Please input your Name! (Min is 6 & Max is 10)"
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[
              { required: true, message: "" },
              {
                validator: async (_, number) => {
                  if (!number) {
                    return Promise.reject(
                      new Error("Please input your Number!")
                    );
                  } else if (
                    number.trim().length < 6 ||
                    number.trim().length > 10
                  ) {
                    return Promise.reject(
                      new Error(
                        "Please input your Number! (Min is 6 & Max is 10)"
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
