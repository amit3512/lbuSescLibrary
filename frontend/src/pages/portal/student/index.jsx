import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Input, Row, Tabs, Typography } from "antd";
import StudentProfile from "./profile";
import Graduation from "./graduation";
import MyEnrollments from "./myEnrollments";
import Courses from "../courses";
import Welcome from "./welcome";
import {
  getAllCourses,
  searchSpecificCourses,
} from "../../../store/action/courses";
import { getEnrolledCourses } from "../../../store/action/student";
import MyInvoices from "./myInvoices";
import {
  getAllInvoices,
  getFinanceAccInfo,
} from "../../../store/action/invoice";
import { logout } from "../../../store/action/auth";

const { Text } = Typography;

export default function StudentPortal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.data);

  const [edit, setEdit] = useState(false);
  const [searchCourseText, setSearchCoureText] = useState("");
  const [activeKey, setActiveKey] = useState("1");
  const [courseDetails, setCourseDetails] = useState({
    details: "",
    show: false,
  });

  useEffect(() => {
    if (searchCourseText === "") dispatch(getAllCourses());
  }, [dispatch, searchCourseText]);

  const searchCourse = () => {
    setActiveKey("2");
    dispatch(searchSpecificCourses(searchCourseText));
  };

  const onChange = (key) => {
    setSearchCoureText("");
    setActiveKey(key);
    setEdit(false);
    setCourseDetails({
      details: "",
      show: false,
    });

    switch (key) {
      case "2":
        dispatch(getAllCourses());
        break;

      case "3":
        dispatch(getEnrolledCourses(user?.studentId));
        break;

      case "5":
        dispatch(getFinanceAccInfo());
        break;

      case "6":
        dispatch(getAllInvoices());
        break;

      default:
        console.log("Hello"); // Assuming you want to log "Hello" in the default case
    }
  };

  const items = useMemo(() => {
    const defaultItems = [
      {
        key: "1",
        label: "Home",
        children: <Welcome />,
      },
      {
        key: "2",
        label: "All Courses",
        children: (
          <Courses
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
        ),
      },
    ];

    if (user && user.enrolledCourses && user.enrolledCourses.length > 0) {
      return [
        ...defaultItems,
        {
          key: "3",
          label: "My Enrollments",
          children: (
            <MyEnrollments
              courseDetails={courseDetails}
              setCourseDetails={setCourseDetails}
            />
          ),
        },
        {
          key: "4",
          label: "Student Profile",
          children: <StudentProfile setEdit={setEdit} edit={edit} />,
        },
        {
          key: "5",
          label: "Graduation",
          children: <Graduation />,
        },
        {
          key: "6",
          label: "Invoice",
          children: <MyInvoices />,
        },
      ];
    }

    return defaultItems;
  }, [user, courseDetails, setCourseDetails, setEdit, edit]);

  console.log("Allow Clear", searchCourseText);

  return (
    <>
      <div style={{ marginLeft: 10 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h2>Student Portal</h2>
          </Col>

          <Col style={{ display: "flex", alignItems: "center" }}>
            <Input
              allowClear
              placeholder="Search"
              value={searchCourseText}
              onChange={(e) => setSearchCoureText(e.target.value)}
              onPressEnter={searchCourse}
            />
            <Button
              style={{ marginLeft: 8, background: "#FFC300" }}
              onClick={searchCourse}
            >
              Course Search
            </Button>
            <Button
              style={{ marginLeft: 8, background: "red", color: "white" }}
              onClick={() => dispatch(logout())}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
        <Tabs onChange={onChange} items={items} activeKey={activeKey} />
      </div>
    </>
  );
}
