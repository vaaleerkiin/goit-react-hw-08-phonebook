import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import { ButtonWrap } from './Phonebook.styled';
export const PhonebookForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const onFinish = values => {
    console.log('Success:', values);
    toogleModal();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Number"
            name="Number"
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
