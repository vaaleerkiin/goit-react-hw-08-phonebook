import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useEditContactsMutation } from "redux/contacts/operations";
import { toast } from "react-toastify";
import { FormType } from "Type&Intarface/FormType";
import { DataType } from "Type&Intarface/dataType";
import { MaskedInput } from "antd-mask-input";

interface IProps {
  open: boolean;
  toogleModal: () => void;
  name: string;
  number: string;
  id: string;
  data: DataType[];
}

export const PhonebookModal: React.FC<IProps> = ({
  open,
  toogleModal,
  id,
  name,
  number,
  data,
}) => {
  const [form] = Form.useForm();
  const [editContatctById, { isError, isSuccess }] = useEditContactsMutation();
  const onFinish = (values: FormType) => {
    toogleModal();

    if (
      data.some(
        (el) =>
          values.name.toLowerCase().includes(el.name.toLowerCase()) &&
          values.number.toLowerCase().includes(el.number.toLowerCase())
      )
    ) {
      toast.error(`${values.name} is already in contacts`);
      return;
    } else {
      editContatctById({ id, values });
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
    <Modal
      title={<h3 style={{ textAlign: "center" }}>Edit contact</h3>}
      open={open}
      onOk={toogleModal}
      onCancel={toogleModal}
      footer={null}
    >
      <Form
        form={form}
        name={`edit ${id}`}
        labelCol={{ span: 4 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: `${name}`, number: `${number}` }}
        onFinish={onFinish}
        onFinishFailed={() => form.resetFields}
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
                    new Error("Please input your Name! (Min is 6 & Max is 10)")
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
                if (!number || number.includes("_")) {
                  return Promise.reject(new Error("Please input your Number!"));
                }
              },
            },
          ]}
        >
          <MaskedInput mask={"+00(000)-000-00-00"} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
