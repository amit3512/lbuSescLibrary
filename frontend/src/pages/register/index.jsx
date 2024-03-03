import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Typography, notification } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const Register = () => {
  const [formRegister] = Form.useForm();
  const navigate = useNavigate();

  const onFinishRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/users/register",
        values
      );
      console.log("response", response);
      if (response.status === 201) {
        navigate("/successfulRegister");
        notification.success({
          message: "Successfully Registered User",
          // Other configuration options if needed
        });
      }
    } catch (error) {
      navigate("/register");
      notification.info({
        message: error?.response?.data,
      });
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={12} lg={8}>
        <>
          <Title level={2}>Please sign in</Title>
          <Form
            form={formRegister}
            onFinish={onFinishRegister}
            layout="vertical"
          >
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                style={{ width: "70%", height: 45 }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" style={{ width: "70%", height: 45 }} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                placeholder="Password"
                style={{ width: "70%", height: 45 }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "70%", height: 45 }}
            >
              Sign Up
            </Button>

            <br />
            <Text>
              Already have an account?
              <Link to="/login"> Login</Link>
            </Text>
          </Form>
        </>
      </Col>
    </Row>
  );
};

export default Register;
