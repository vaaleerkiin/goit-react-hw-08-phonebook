import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { useLoginMutation } from 'redux/Auth/operations';

export const LoginForm = () => {
  const [postLogin, { error, isUninitialized, isSuccess, isError }] =
    useLoginMutation();

  const onFinish = values => {
    console.log('Success:', values);
    postLogin(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error('Fail');
    }
  }, [error, isError, isUninitialized]);

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      toast.success('Success');
    }
  }, [isSuccess, isUninitialized]);

  return (
    <>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your mail!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
