import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateBorrowReturn } from "../../../store/action/auth";

export default function BorrowReturn(props) {
  const { studentId } = useSelector((state) => state.auth?.data);
  const dispatch = useDispatch();

  const getupdateBorrowReturn = () => {
    dispatch(updateBorrowReturn(props.type, props.isbn, studentId));
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Input
        placeholder="ISBN"
        style={{ width: 250 }}
        value={props.isbn}
        onChange={(e) => props.setISBN(e.target.value)}
      />
      <br />
      <br />
      <Button type="primary" onClick={getupdateBorrowReturn}>
        {props.type}
      </Button>
    </div>
  );
}
