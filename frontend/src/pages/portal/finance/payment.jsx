import { Button, Col, Input, Row, Typography, notification } from "antd";
import { useState } from "react";
import axios from "axios";

const { Title, Text } = Typography;
export default function PaymentPortal() {
  const [referenceNo, setRefereneNo] = useState("");
  const [invoiceData, setInvoiceData] = useState("");
  const [findInvcBtn, setFindInvcBtn] = useState(false);

  const findInvoice = async () => {
    if (referenceNo) {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/finance/accounts/invoices/${referenceNo}`
        );

        console.log("invoices", response);
        if (response.status === 200 && response.data.data) {
          setInvoiceData(response.data.data);
          setFindInvcBtn(true);
        } else {
          notification.info({
            message: "No invoice found for the provided reference",
          });
        }
      } catch (error) {}
    }
  };

  const payInvoice = async () => {
    const response = await axios.put(
      `http://localhost:8085/api/finance/accounts/invoices/pay/${referenceNo}`
    );
    console.log("payment", response);
    if (response.status === 200) {
      setInvoiceData(response.data.data);
    }
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Title level={3}>
        <span style={{ color: "orange" }}>Payment</span> Portal
      </Title>
      {findInvcBtn && referenceNo !== "" ? (
        <>
          <Title level={4}>Invoice</Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Text>Reference</Text>
              <Text>{invoiceData?.reference}</Text>
            </Col>

            <Col span={6}>
              <Text>Student ID</Text>
              <Text>{invoiceData?.studentId}</Text>
            </Col>

            <Col span={6}>
              <Text>Amount</Text>
              <Text>{invoiceData?.amount}</Text>
            </Col>

            <Col span={6}>
              <Text>Due Date</Text>
              <Text>{invoiceData?.dueDate}</Text>
            </Col>

            <Col span={6}>
              <Text>Type</Text>
              <Text>{invoiceData?.type}</Text>
            </Col>

            <Col span={6}>
              <Text>Status</Text>
              <Text>{invoiceData?.status}</Text>
            </Col>
          </Row>

          <Row>
            <Button
              onClick={() => {
                setFindInvcBtn(!findInvcBtn);
                setInvoiceData("");
                setRefereneNo("");
              }}
            >
              Find Another Invoice
            </Button>
            {invoiceData?.status === "PAID" ? (
              ""
            ) : (
              <Button onClick={payInvoice}>Pay Invoice</Button>
            )}
          </Row>
        </>
      ) : (
        <>
          <Title level={4}>Invoice Reference</Title>
          <Input
            style={{ width: 255 }}
            onChange={(e) => setRefereneNo(e.target.value)}
          />
          {/* {findInvcBtn && referenceNo === "" && <p>Enter Reference No.</p>} */}

          <br />
          <br />
          <Button onClick={findInvoice} type="primary">
            Find Invoice
          </Button>
        </>
      )}
    </div>
  );
}
