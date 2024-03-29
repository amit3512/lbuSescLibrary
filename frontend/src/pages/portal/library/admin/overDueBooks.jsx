import { Table } from "antd";
import "../../../../css/myAcc.css";
import { useSelector } from "react-redux";

export default function OverDue() {
  const { data, loading } = useSelector((state) => state.students);
  const booksData = useSelector((state) => state.books);

  let overDueData = [];
  data?.forEach((x) => {
    x?.books?.filter((book, index) => {
      return parseInt(book?.overDue) > 0
        ? overDueData.push({
            studentId: x.studentId,
            isbn: book.isbn,
            title: booksData?.data?.find((x) => x.isbn === book.isbn).title,
            borrowDate: new Date(book?.borrowDate).toLocaleDateString("en"),
            dueDate: new Date(book?.dueDate).toLocaleDateString("en"),
            returnDate: new Date(book?.returnDate).toLocaleDateString("en"),
            overDue: book?.overDue,
            key: index,
          })
        : "";
    });
  });

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
      title: "Student",
      key: "3",
      dataIndex: "studentId",
    },
    {
      title: "Borrowed",
      key: "4",
      dataIndex: "borrowDate",
    },
    {
      title: "Due",
      key: "4",
      dataIndex: "dueDate",
    },
    {
      title: "Returned",
      key: "5",
      dataIndex: "returnDate",
    },
    {
      title: "Overdue",
      key: "6",
      dataIndex: "overDue",
    },
  ];
  //   var options = { year: "numeric", month: "2-digit", day: "2-digit" };

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={overDueData}
        loading={loading}
      />
    </div>
  );
}
