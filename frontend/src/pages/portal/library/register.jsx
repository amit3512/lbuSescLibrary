import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "../../../css/myAcc.css";

export default function Register() {
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
    console.log("Form submitted with values:", values);
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
