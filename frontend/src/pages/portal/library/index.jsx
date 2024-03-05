import { useState } from "react";
import { Tabs } from "antd";
import MyAccount from "./myAccount";
import BorrowReturn from "./borrowReturn";
import AllBooks from "./allBooks";
import { useDispatch } from "react-redux";
import { getAllBooks } from "../../../store/action/books";

export default function LibraryPortal() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("4");
  const items = [
    {
      label: "Books",
      key: "1",
      children: <AllBooks />,
    },
    {
      label: "Borrow",
      key: "2",
      children: <BorrowReturn type="Borrow" />,
    },
    {
      label: "Return",
      key: "3",
      children: <BorrowReturn type="Return" />,
    },
    {
      label: "My Account",
      key: "4",
      children: <MyAccount />,
    },
  ];

  const onChange = (key) => {
    // setSearchCoureText("");
    setActiveKey(key);
    if (key === "1") {
      dispatch(getAllBooks());
    }
    // setEdit(false);
    // setCourseDetails({
    //   details: "",
    //   show: false,
    // });
  };

  return (
    <div>
      <Tabs onChange={onChange} items={items} activeKey={activeKey} />
    </div>
  );
}
