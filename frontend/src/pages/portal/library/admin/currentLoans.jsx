import { Table } from "antd";
import "../../../../css/myAcc.css";
import { useSelector } from "react-redux";

export default function CurrentLoans() {
  const { data, loading } = useSelector((state) => state.students);
  const booksData = useSelector((state) => state.books);

  let currentLoanData = [];
  data?.forEach((x) => {
    x.books.filter((book, index) => {
      return !book.isReturned
        ? currentLoanData.push({
            studentId: x.studentId,
            isbn: book.isbn,
            title: booksData?.data?.find((x) => x.isbn === book.isbn).title,
            borrowDate: new Date(book?.borrowDate).toLocaleDateString("en"),
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
  ];
  //   var options = { year: "numeric", month: "2-digit", day: "2-digit" };

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={currentLoanData}
        loading={loading}
      />
    </div>
  );
}
