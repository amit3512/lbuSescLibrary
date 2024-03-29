import { Table } from "antd";
import "../../../../css/myAcc.css";
import { useSelector } from "react-redux";

export default function AllStudents() {
  const { data, loading } = useSelector((state) => state.students);

  const columns = [
    {
      title: "Student",
      key: "1",
      dataIndex: "studentId",
    },
    {
      title: "On Loan",
      key: "2",
      dataIndex: "onLoanCount",
    },
    {
      title: "Overdue",
      key: "3",
      dataIndex: "overdueCount",
    },
  ];
  // //   var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const countBooksStatus = () => {
    const booksStatusCounts = [];

    // Iterate through the accounts
    data?.forEach((account) => {
      const { studentId, books } = account;
      let overdueCount = 0;
      let onLoanCount = 0;

      // Iterate through the books for each account
      books.forEach((book) => {
        if (!book.isReturned) {
          // Count books on loan
          onLoanCount++;
        }
        if (book.overDue > 0) {
          // Count overdue books
          overdueCount++;
        }
      });

      // Store the counts for the current student
      booksStatusCounts.push({
        key: studentId,
        studentId,
        overdueCount,
        onLoanCount,
      });
    });

    return booksStatusCounts;
  };

  const booksStatusCounts = countBooksStatus();

  return (
    <div className="centered-table">
      <Table
        columns={columns}
        alignItems="center"
        dataSource={booksStatusCounts}
        loading={loading}
      />
    </div>
  );
}
