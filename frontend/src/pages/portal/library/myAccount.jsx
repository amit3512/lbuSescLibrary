import { Table } from "antd";
import "../../../css/myAcc.css";

export default function MyAccount() {
  const columns = [
    {
      title: "Book",
      key: "1",
      dataIndex: "name",
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

  const data = [
    {
      name: "BOOKKKKS NUMBER 11111",
      borrowDate: "Sept 20, 2023",
      returnDate: "Sept 20, 2023",
      overDue: "1023654",
    },
  ];
  return (
    <div className="centered-table">
      <Table columns={columns} alignItems="center" dataSource={data} />
    </div>
  );
}
