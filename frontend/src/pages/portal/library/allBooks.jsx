import { useSelector } from "react-redux";

import { Table } from "antd";
import "../../../css/myAcc.css";

export default function AllBooks() {
  const { data, loading } = useSelector((state) => state.books);
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
      dataIndex: "author",
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

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={data?.map((x) => {
          return {
            ...x,
            key: x.isbn,
          };
        })}
        loading={loading}
      />
    </div>
  );
}
