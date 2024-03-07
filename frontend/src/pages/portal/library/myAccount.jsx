import { Table } from "antd";
import "../../../css/myAcc.css";
import { useSelector } from "react-redux";

export default function MyAccount() {
  const { data, loading } = useSelector((state) => state.auth);
  console.log("data", data);

  const columns = [
    {
      title: "Book",
      key: "1",
      dataIndex: "isbn",
    },
    {
      title: "Date Borrowed",
      key: "2",
      dataIndex: "borrowDate",
    },
    {
      title: "Date Returned",
      key: "3",
      dataIndex: "returnDate",
    },
    {
      title: "Overdue",
      key: "4",
      dataIndex: "overDue",
    },
  ];

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={data?.books?.map((x) => ({
          ...x,
          key: x.isbn,
        }))}
        loading={loading}
      />
    </div>
  );
}
