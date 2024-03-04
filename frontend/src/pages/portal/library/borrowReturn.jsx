import { Button, Input } from "antd";

export default function BorrowReturn(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Input placeholder="ISBN" style={{ width: 250 }} />
      <br />
      <br />
      <Button type="primary">{props.type}</Button>
    </div>
  );
}
