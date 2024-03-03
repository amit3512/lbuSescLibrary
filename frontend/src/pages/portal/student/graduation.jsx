import { useSelector } from "react-redux";
import { Button, Typography } from "antd";
const { Title, Text } = Typography;

export default function Graduation() {
  const user = useSelector((state) => state.auth?.data);
  const myFinanceAcc = useSelector((state) => state.invoice);
  const outstanding = myFinanceAcc?.financeData?.accountList?.find(
    (x) => x?.studentId === user?.studentId
  );
  console.log("myFinanceAccoutstanding", myFinanceAcc);
  const data = outstanding?.hasOutstandingBalance
    ? {
        status: "Ineligible to Graduate !!!",
        info: "Please log into the Payment Portal to pay your outstanding balance. Go to Invoice Section for further details.",
        color: "grey",
      }
    : {
        status: "Eligible to Graduate",
        info: "",
        color: "green",
      };
  return (
    <>
      <div style={{ marginLeft: 20, marginTop: -30 }}>
        <Title level={3}>Graduation</Title>
        <Text>
          You need to pay any outstanding course and library fees before you are
          eligible to graduate.
        </Text>
        <br />
        <br />
        {!myFinanceAcc?.loading && (
          <>
            <Text>Status:</Text>{" "}
            <Button style={{ background: data.color, color: "white" }}>
              {data.status}
            </Button>
            <br />
            {data.info}
          </>
        )}
      </div>
    </>
  );
}
