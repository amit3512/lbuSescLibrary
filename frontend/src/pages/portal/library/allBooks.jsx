import { Table } from "antd";
import "../../../css/myAcc.css";

export default function AllBooks() {
  const columns = [
    {
      title: "ISBN",
      key: "1",
      dataIndex: "isbn",
    },
    {
      title: "Title",
      key: "2",
      dataIndex: "title",
    },
    {
      title: "Author",
      key: "3",
      dataIndex: "returnDate",
    },
    {
      title: "Year",
      key: "4",
      dataIndex: "year",
    },
    {
      title: "Copies",
      key: "5",
      dataIndex: "copies",
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
