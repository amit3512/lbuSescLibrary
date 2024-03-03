import { useSelector } from "react-redux";
import { Button, Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import SingleCourseDetails from "../../../components/singleCourseDetail.jsx";

export default function MyInvoices(props) {
  const user = useSelector((state) => state.auth?.data);
  const myInvoices = useSelector((state) => state.invoice);
  const studentInvoices = myInvoices?.data?.invoiceList?.filter(
    (x) =>
      x.studentId === user.studentId &&
      (x.status === "OUTSTANDING" || x.status === "PAID")
  );

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "1",
    },

    {
      title: "Amount (Pound)",
      dataIndex: "amount",
      key: "2",
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "3",
    },

    {
      title: "Reference",
      dataIndex: "reference",
      key: "4",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "5",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "6",
      render: (text, record) => {
        const data =
          record.status === "OUTSTANDING" ? (
            <Button style={{ background: "#808000", color: "white" }}>
              {" "}
              <a
                href="http://localhost:8081/portal"
                target="_blank"
                rel="noreferrer"
              >
                Pay Now
              </a>
            </Button>
          ) : (
            <Button style={{ background: "green", color: "white" }}>
              Paid
            </Button>
          );
        return data;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={studentInvoices?.map((invoice) => ({
          ...invoice,
          key: invoice.id,
        }))}
        loading={myInvoices?.loading}
      />

      {/* <Modal
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
      </Modal> */}
    </>
  );
}
