import { Button, Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import SingleCourseDetails from "../../../components/singleCourseDetail.jsx";
import { useSelector } from "react-redux";

export default function AllCoures(props) {
  const user = useSelector((state) => state.auth?.data);
  const courses = useSelector((state) => state.course);

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
      title: "Status",
      dataIndex: "status",
      key: "4",
      render: (text, record) => {
        const data = user.enrolledCourses?.find((x) => x.id === record.id) ? (
          <Button style={{ background: "green", color: "white" }}>
            Enrolled
          </Button>
        ) : (
          <Button style={{ background: "#808000", color: "white" }}>
            UnEnroll
          </Button>
        );
        return data;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "5",
      render: (text, record, index) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() =>
              props?.setCourseDetails({
                details: record,
                show: true,
              })
            }
          ></Button>
        </span>
      ),
    },
  ];

  const allCourses = courses?.data;

  return (
    <>
      <Table
        columns={columns}
        dataSource={allCourses?.map((course) => ({
          ...course,
          key: course.id,
        }))}
        loading={courses?.loading}
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
          title={props?.courseDetails?.details.name}
          description={props.courseDetails.details.description}
          fee={props.courseDetails.details.fee}
          courseId={props?.courseDetails?.details.id}
        />
      </Modal>
    </>
  );
}
