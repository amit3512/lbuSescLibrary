import { useDispatch } from "react-redux";

import { Typography } from "antd";
import { logout } from "../../../store/action/auth";

const { Title, Text } = Typography;

export default function MasterLayout({ component: Component, ...rest }) {
  const dispatch = useDispatch();
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
        <Text
          style={{ marginRight: 5, marginTop: 29, cursor: "pointer" }}
          onClick={() => dispatch(logout())}
        >
          Log Out
        </Text>
      </div>
      <div className="main-panel">{Component && <Component />}</div>
    </div>
  );
}
