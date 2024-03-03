import { Link } from "react-router-dom";
import { Col, Row, Typography } from "antd";

const { Title, Text } = Typography;

const SuccessfulRegister = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={12} lg={8}>
        <>
          <Title level={2} align="center">
            You have Regitered Successfully.
          </Title>

          <Title level={3} align="center">
            <Link to="/login">Click here to Log in.</Link>
          </Title>
        </>
      </Col>
    </Row>
  );
};

export default SuccessfulRegister;
