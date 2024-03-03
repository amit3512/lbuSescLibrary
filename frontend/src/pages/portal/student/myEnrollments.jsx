import { useSelector } from "react-redux";
import { Button, Modal, Table, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import SingleCourseDetails from "../../../components/singleCourseDetail.jsx";

export default function MyEnrollments(props) {
  const user = useSelector((state) => state.auth?.data);
  const myEnrollments = user?.enrolledCourses;

  console.log("Myenrollments", myEnrollments);

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "2",
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "3",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "4",
      render: (text, record, index) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              props.setCourseDetails({
                details: record,
                show: true,
              })
            }
          ></Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={myEnrollments?.map((course) => ({
          ...course,
          key: course.id,
        }))}
      />

      <Modal
        // title="Basic Modal"
        open={props.courseDetails.show}
        // onOk={handleOk}
        onCancel={() =>
          props.setCourseDetails({
            details: "",
            show: false,
          })
        }
        footer={false}
      >
        <SingleCourseDetails
          courseId={props?.courseDetails?.details.id}
          title={props?.courseDetails?.details.name}
          description={props.courseDetails.details.description}
          fee={props.courseDetails.details.fee}
          setCourseDetails={props.setCourseDetails}
        />
      </Modal>
    </>
  );
}
