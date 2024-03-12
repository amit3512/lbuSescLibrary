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
      title: "Due Date",
      key: "4",
      dataIndex: "dueDate",
    },
    {
      title: "Overdue",
      key: "5",
      dataIndex: "overDue",
    },
  ];
  var options = { year: "numeric", month: "2-digit", day: "2-digit" };

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={data?.books?.map((x, index) => ({
          ...x,
          key: index + 1,
          borrowDate: new Date(x.borrowDate).toLocaleDateString("en", options),
          returnDate: new Date(x.returnDate).toLocaleDateString("en", options),
          dueDate: new Date(x.dueDate).toLocaleDateString("en", options),
        }))}
        loading={loading}
      />
    </div>
  );
}
