import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEnrolledCourse } from "../../store/action/student";

const { Title, Text } = Typography;

export default function SingleCourseDetails(props) {
  const user = useSelector((state) => state.auth?.data);

  const dispatch = useDispatch();

  console.log("enrolledCoursesSingle", user?.enrolledCourses);

  const alreadyEnrolled = user?.enrolledCourses?.find(
    (course) => course.id === props?.courseId
  )
    ? true
    : false;

  const onClickEnrol = async () => {
    // console.log("We are here", props?.courseId);
    dispatch(UpdateEnrolledCourse(props?.courseId, user?.email));
  };
  return (
    <div style={{ marginLeft: 30 }}>
      <Title level={2}>{props.title}</Title>
      <Text>{props.description}</Text>
      <br />
      <br />
      <Text>{props.fee}</Text> <br />
      <br />
      {!alreadyEnrolled && (
        <Button type="primary" onClick={onClickEnrol}>
          Enrol
        </Button>
      )}
    </div>
  );
}
