import AllCoures from "./allcourses";

export default function Courses(props) {
  return (
    <AllCoures
      courseDetails={props.courseDetails}
      setCourseDetails={props.setCourseDetails}
    />
  );
}
