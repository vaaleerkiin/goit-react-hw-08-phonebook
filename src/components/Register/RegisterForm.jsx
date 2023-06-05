import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { useRegisterMutation } from 'redux/Auth/operations';

export const RegisterForm = () => {
  const [postRegister, { isUninitialized, isSuccess, isError }] =
    useRegisterMutation();

  const onFinish = values => {
    console.log('Success:', values);
    postRegister(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error('Fail');
    }
  }, [isError, isUninitialized]);

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      toast.success('Success');
    }
  }, [isSuccess, isUninitialized]);

  return (
    <>
      <h1>Register</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            { required: true, message: '' },
            {
              validator: async (_, names) => {
                if (!names) {
                  return Promise.reject(
                    new Error('Please input your username!')
                  );
                } else if (names.trim().length < 6) {
                  return Promise.reject(
                    new Error('Please input your username! (Min is 6)')
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: '' },
            {
              validator: async (_, mail) => {
                if (!mail) {
                  return Promise.reject(new Error('Please input your mail!'));
                } else if (mail.trim().length < 8) {
                  return Promise.reject(
                    new Error('Please input your mail! (Min is 8)')
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: '' },
            {
              validator: async (_, password) => {
                if (!password) {
                  return Promise.reject(
                    new Error('Please input your password!')
                  );
                } else if (password.trim().length < 6) {
                  return Promise.reject(
                    new Error('Please input your password! (Min is 8)')
                  );
                }
              },
            },
          ]}
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
