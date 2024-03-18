import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";
import "../../../css/myAcc.css";

import { attemptLogin } from "../../../store/action/auth";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else if (
      message == "Change your PIN." ||
      data?.message == "Change your PIN."
    ) {
      navigate("/firstLogin");
    } else {
      navigate("/");
    }
  }, [data, navigate]);

  const onLoginFinish = (values) => {
    dispatch(attemptLogin(values));
  };
  return (
    <div className="centered-table">
      <Form onFinish={onLoginFinish}>
        <Form.Item name="studentId">
          <Input placeholder="Student Id" />
        </Form.Item>
        <Form.Item name="pin">
          <Input.Password placeholder="PIN" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}
