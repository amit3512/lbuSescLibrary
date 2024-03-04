// import React, { useEffect } from "react";
// import { connect, useDispatch, useSelector } from "react-redux";

// import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { attemptLogin } from "../../store/action/auth";

// const { Title } = Typography;

// const Login = () => {
//   const [formLogin] = Form.useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth?.data);
//   console.log("loginUser", user);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       navigate("/");
//     }
//   }, [user]);

//   const onFinishLogin = async (values) => {
//     dispatch(attemptLogin(values["email"], values["password"]));
//   };

//   return (
//     <Row justify="center">
//       <Col xs={24} sm={16} md={12} lg={8}>
//         <>
//           <Title level={2}>Please sign in</Title>
//           <Form form={formLogin} onFinish={onFinishLogin}>
//             <Form.Item
//               name="email"
//               rules={[
//                 { required: true, message: "Please input your username!" },
//               ]}
//             >
//               <Input
//                 placeholder="Username"
//                 style={{ width: "70%", height: 45 }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your password!" },
//               ]}
//             >
//               <Input
//                 placeholder="Password"
//                 style={{ width: "70%", height: 45 }}
//               />
//             </Form.Item>

//             <Form.Item name="rememberMe" valuePropName="checked">
//               <Checkbox> Remember me</Checkbox>
//             </Form.Item>

//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{ width: "70%", height: 45 }}
//             >
//               Submit
//             </Button>

//             <br />
//             <Link to="/register">Click here to register</Link>
//           </Form>
//         </>
//       </Col>
//     </Row>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     loginToken: state.loginToken,
//     schoolType: state.fetchActionSchoolType,
//   };
// };

// export default connect(mapStateToProps, {})(Login);
