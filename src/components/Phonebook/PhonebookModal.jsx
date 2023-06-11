import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useEditContactsMutation } from 'redux/contacts/contactsSlice';
import { toast } from 'react-toastify';

export const PhonebookModal = ({
  open,
  toogleModal,
  id,
  name,
  number,
  data,
}) => {
  const [form] = Form.useForm();
  const [editContatctById, { isError, isSuccess }] = useEditContactsMutation();
  const onFinish = values => {
    toogleModal();
    form.resetFields();
    if (
      data.some(el => values.name.toLowerCase().includes(el.name.toLowerCase()))
    ) {
      toast.error(`${values.name} is alreadyin contacts`);
      return;
    } else {
      editContatctById({ id, values });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error('Fail');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Success');
    }
  }, [isSuccess]);

  return (
    <Modal
      title={<h3 style={{ textAlign: 'center' }}>Edit contact</h3>}
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
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: '' },
            {
              validator: async (_, names) => {
                if (!names) {
                  return Promise.reject(new Error('Please input your Name!'));
                } else if (
                  names.trim().length < 6 ||
                  names.trim().length > 10
                ) {
                  return Promise.reject(
                    new Error('Please input your Name! (Min is 6 & Max is 10)')
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
            { required: true, message: '' },
            {
              validator: async (_, number) => {
                if (!number) {
                  return Promise.reject(new Error('Please input your Number!'));
                } else if (
                  number.trim().length < 6 ||
                  number.trim().length > 10
                ) {
                  return Promise.reject(
                    new Error(
                      'Please input your Number! (Min is 6 & Max is 10)'
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
  );
};
