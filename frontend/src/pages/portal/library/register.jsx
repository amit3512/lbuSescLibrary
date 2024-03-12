import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input } from "antd";
import "../../../css/myAcc.css";
import { attemptRegister } from "../../../store/action/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data && data.message !== "Change your PIN.") {
      navigate("/");
    }
  }, [data, navigate]);

  const [confirmPinError, setConfirmPinError] = useState(null);

  const validateConfirmPin = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("pin") === value) {
        setConfirmPinError(null);
        return Promise.resolve();
      }
      setConfirmPinError("PIN does not match");
      return Promise.reject(new Error("PIN does not match"));
    },
  });

  const onFinish = (values) => {
    dispatch(attemptRegister(values));
    // Add additional logic for handling the form submission
  };

  return (
    <div className="centered-table">
      <Form onFinish={onFinish}>
        <Form.Item name="studentId">
          <Input placeholder="Student Id" />
        </Form.Item>
        <Form.Item name="pin">
          <Input placeholder="New PIN" />
        </Form.Item>
        <Form.Item
          name="confirmPin"
          dependencies={["pin"]}
          rules={[
            { required: true, message: "Please confirm your PIN!" },
            validateConfirmPin,
          ]}
          validateStatus={confirmPinError ? "error" : ""}
          help={confirmPinError}
        >
          <Input placeholder="Confirm PIN" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
