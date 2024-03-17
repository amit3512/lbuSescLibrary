import { useState } from "react";
import { Tabs } from "antd";
import MyAccount from "./myAccount";
import BorrowReturn from "./borrowReturn";
import AllBooks from "./allBooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../../store/action/books";
import { getAllStudents } from "../../../store/action/student";
import CurrentLoans from "./admin/currentLoans";
import OverDue from "./admin/overDueBooks";
import AllStudents from "./admin/allStudents";

export default function LibraryPortal() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const [activeKey, setActiveKey] = useState(
    // data.studentId !== "admin" ? "4" : "5"
    "1"
  );
  const [isbn, setISBN] = useState("");
  const items = [
    {
      label: "Books",
      key: "1",
      children: <AllBooks />,
    },
  ];

  //"Borrow" and "Return" options for admin and normal user
  if (data.studentId !== "admin") {
    items.splice(1, 0, {
      label: "Borrow",
      key: "2",
      children: <BorrowReturn type="borrow" setISBN={setISBN} isbn={isbn} />,
    });

    items.splice(2, 0, {
      label: "Return",
      key: "3",
      children: <BorrowReturn type="return" setISBN={setISBN} isbn={isbn} />,
    });
    items.splice(3, 0, {
      label: "My Account",
      key: "4",
      children: <MyAccount />,
    });
  } else {
    items.splice(1, 0, {
      label: "Students",
      key: "5",
      children: <AllStudents />,
    });

    items.splice(2, 0, {
      label: "Current Loans",
      key: "6",
      children: <CurrentLoans />,
    });
    items.splice(3, 0, {
      label: "Overdue",
      key: "7",
      children: <OverDue />,
    });
  }

  const onChange = (key) => {
    setISBN("");
    setActiveKey(key);
    if (key === "1") {
      dispatch(getAllBooks());
    }

    if (key === "4" || key === "5" || key === "6") {
      dispatch(getAllStudents());
    }
  };

  return (
    <div>
      <Tabs onChange={onChange} items={items} activeKey={activeKey} />
    </div>
  );
}
