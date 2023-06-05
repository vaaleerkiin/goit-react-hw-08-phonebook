import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { ButtonWrap } from './Phonebook.styled';
import {
  useAddContactsMutation,
  useGetContactsQuery,
} from 'redux/contacts/contactsSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const PhonebookForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContatct, { isSuccess, isError }] = useAddContactsMutation();
  const { data } = useGetContactsQuery();
  const toogleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const onFinish = values => {
    toogleModal();
    if (
      data.some(el => values.name.toLowerCase().includes(el.name.toLowerCase()))
    ) {
      toast.error(`${values.name} is alreadyin contacts`);
      return;
    } else {
      postContatct(values);
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
    <>
      <ButtonWrap>
        <span>Add contact</span>
        <Button
          type="primary"
          style={{ backgroundColor: '#4BB543' }}
          icon={<PlusOutlined />}
          size="large"
          onClick={toogleModal}
        />
      </ButtonWrap>
      <Modal
        title="Add contact"
        open={isModalOpen}
        onOk={toogleModal}
        onCancel={toogleModal}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: 'Please input your Number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
