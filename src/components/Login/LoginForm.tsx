import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { useLoginMutation } from "redux/Auth/operations";

export const LoginForm: React.FC = () => {
  const [postLogin, { isUninitialized, isSuccess, isError }] =
    useLoginMutation();

  const onFinish = (values: { name: string; email: string }) => {
    postLogin(values);
  };

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error("Fail");
    }
  }, [isError, isUninitialized]);

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      toast.success("Success");
    }
  }, [isSuccess, isUninitialized]);

  return (
    <>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: "100%" }}
        initialValues={{ name: "", email: "" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your mail!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
