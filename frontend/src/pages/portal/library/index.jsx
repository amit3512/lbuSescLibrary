import { useState } from "react";
import { Tabs, Typography } from "antd";
import MyAccount from "./myAccount";
import BorrowReturn from "./borrowReturn";
import AllBooks from "./allBooks";

const { Title, Text } = Typography;
export default function LibraryPortal() {
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
    // setEdit(false);
    // setCourseDetails({
    //   details: "",
    //   show: false,
    // });
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Title level={3}>
          <span style={{ color: "orange" }}>Library</span> Portal
        </Title>
        <Text style={{ marginRight: 5, marginTop: 29 }}>Log Out</Text>
      </div>
      <div>
        <Tabs onChange={onChange} items={items} activeKey={activeKey} />
      </div>
    </div>
  );
}
