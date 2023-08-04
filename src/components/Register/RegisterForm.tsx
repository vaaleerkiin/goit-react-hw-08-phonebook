import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { useLoginMutation, useRegisterMutation } from "redux/Auth/operations";
import { IUser } from "Type&Intarface/IUser";

export const RegisterForm: React.FC = () => {
  const [postRegister, { isUninitialized, isSuccess, isError }] =
    useRegisterMutation();
  const [postLogin] = useLoginMutation();
  const [formValue, setFormValue] = useState<Pick<
    IUser,
    "email" | "password"
  > | void>();
  const onFinish = async (values: IUser) => {
    await postRegister(values);
    setFormValue(values);
  };

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error("Fail");
    }
  }, [isError, isUninitialized]);

  useEffect(() => {
    if (
      !isUninitialized &&
      isSuccess &&
      formValue?.email &&
      formValue?.password
    ) {
      toast.success("Success");
      postLogin({ email: formValue.email, password: formValue.password });
    }
  }, [formValue, isSuccess, isUninitialized, postLogin]);

  return (
    <>
      <h1>Register</h1>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            { required: true, message: "" },
            {
              validator: async (_, names) => {
                if (!names) {
                  return Promise.reject(
                    new Error("Please input your username!")
                  );
                } else if (names.trim().length < 6) {
                  return Promise.reject(
                    new Error("Please input your username! (Min is 6)")
                  );
                }
              },
            },
          ]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "" },
            {
              validator: async (_, mail) => {
                if (!mail) {
                  return Promise.reject(new Error("Please input your mail!"));
                } else if (mail.trim().length < 8) {
                  return Promise.reject(
                    new Error("Please input your mail! (Min is 8)")
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
            { required: true, message: "" },
            {
              validator: async (_, password) => {
                if (!password) {
                  return Promise.reject(
                    new Error("Please input your password!")
                  );
                } else if (password.trim().length < 6) {
                  return Promise.reject(
                    new Error("Please input your password! (Min is 8)")
                  );
                }
              },
            },
          ]}
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
