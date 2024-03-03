import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../../store/action/auth";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function StudentProfile(props) {
  const user = useSelector((state) => state.auth?.data);

  const [formStudentProfile] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user exists before trying to get field values
    if (user) {
      formStudentProfile.setFieldsValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    }
  }, [formStudentProfile, user]);

  const onFinishStudentProfile = async (values) => {
    props.setEdit(false);
    dispatch(updateStudent(user?.studentId, values));
    console.log("values", values);
  };

  return (
    <>
      <Row gutter={24}>
        <Col style={{ marginLeft: 20, marginTop: -30 }}>
          {!props.edit ? (
            <>
              <Title level={3}>Student Profile</Title>

              <Text>First Name : {user?.firstName} </Text>
              <br />
              <Text>Surname : {user?.lastName}</Text>
              <br />
              <Text>Student ID : {user?.studentId}</Text>
              <br />
              <Button type="primary" onClick={() => props.setEdit(true)}>
                {" "}
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <Title level={3}>Edit Student Profile</Title>
              <Form
                form={formStudentProfile}
                layout="vertical"
                onFinish={onFinishStudentProfile}
              >
                <Form.Item name="firstName" label="First Name">
                  <Input />
                </Form.Item>

                <Form.Item name="lastName" label="Last Name">
                  <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
