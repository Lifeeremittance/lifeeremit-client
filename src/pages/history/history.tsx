import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Form,
  Table,
  Modal,
  Card,
  InputGroup,
} from "react-bootstrap";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { getOrders } from "../../services/order";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const History: React.FC<Props> = () => {
  const [details, setDetails] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [keys, setKeys] = useState(false);
  const [tempKey, setTempKey] = useState("KWYZ125VSY732NA");
  const [licenseKey, setLicenseKey] = useState("KWYZ125VSY732NA");
  const [tempExpiry, setTempExpiry] = useState("16/07/2022");
  const [licenseExpiry, setLicenseExpiry] = useState("16/07/2022");

  const [orders, setOrders] = useState<any>([]);

  // const failedSvg = (
  //   <svg
  //     width="37"
  //     height="37"
  //     viewBox="0 0 37 37"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       d="M10.9325 26.1402C11.3341 26.5418 11.7357 26.7426 12.3381 26.7426C12.9405 26.7426 13.3421 26.5418 13.7437 26.1402L18.3622 21.5217L22.9807 26.1402C23.3823 26.5418 23.9847 26.7426 24.3863 26.7426C24.7879 26.7426 25.3903 26.5418 25.7919 26.1402C26.5951 25.337 26.5951 24.1321 25.7919 23.3289L21.1734 18.7105L25.7919 14.092C26.5951 13.2888 26.5951 12.084 25.7919 11.2808C24.9887 10.4775 23.7839 10.4775 22.9807 11.2808L18.3622 15.8992L13.7437 11.2808C12.9405 10.4775 11.7357 10.4775 10.9325 11.2808C10.1293 12.084 10.1293 13.2888 10.9325 14.092L15.551 18.7105L10.9325 23.3289C10.1293 24.1321 10.1293 25.337 10.9325 26.1402Z"
  //       fill="black"
  //       fillOpacity="0.71"
  //     />
  //     <path
  //       d="M18.3613 36.783C28.4015 36.783 36.4336 28.7509 36.4336 18.7107C36.4336 8.67055 28.4015 0.638428 18.3613 0.638428C8.32118 0.638428 0.289062 8.67055 0.289062 18.7107C0.289062 28.7509 8.32118 36.783 18.3613 36.783ZM18.3613 4.65449C26.1927 4.65449 32.4175 10.8794 32.4175 18.7107C32.4175 26.542 26.1927 32.7669 18.3613 32.7669C10.53 32.7669 4.30512 26.542 4.30512 18.7107C4.30512 10.8794 10.53 4.65449 18.3613 4.65449Z"
  //       fill="black"
  //       fillOpacity="0.71"
  //     />
  //   </svg>
  // );

  const pendingSvg = (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.1192 0.289062C14.5927 0.289062 11.1454 1.33478 8.2133 3.29398C5.28115 5.25317 2.99582 8.03785 1.64631 11.2959C0.296788 14.5539 -0.0563075 18.1389 0.631671 21.5976C1.31965 25.0563 3.0178 28.2334 5.51139 30.7269C8.00497 33.2205 11.182 34.9187 14.6407 35.6067C18.0994 36.2946 21.6844 35.9415 24.9425 34.592C28.2005 33.2425 30.9852 30.9572 32.9444 28.025C34.9036 25.0929 35.9493 21.6456 35.9493 18.1192C35.9493 15.7777 35.4881 13.4591 34.592 11.2959C33.696 9.13263 32.3826 7.16706 30.727 5.51138C29.0713 3.8557 27.1057 2.54234 24.9425 1.6463C22.7792 0.750252 20.4607 0.289063 18.1192 0.289062ZM18.1192 32.3832C15.298 32.3832 12.5402 31.5467 10.1945 29.9793C7.84876 28.412 6.02049 26.1842 4.94088 23.5778C3.86127 20.9714 3.57879 18.1033 4.12917 15.3364C4.67955 12.5694 6.03808 10.0278 8.03294 8.03294C10.0278 6.03807 12.5694 4.67955 15.3364 4.12916C18.1033 3.57878 20.9714 3.86126 23.5778 4.94087C26.1842 6.02049 28.412 7.84875 29.9793 10.1945C31.5467 12.5402 32.3833 15.298 32.3833 18.1192C32.3833 21.9022 30.8804 25.5304 28.2054 28.2054C25.5304 30.8804 21.9022 32.3832 18.1192 32.3832Z"
        fill="#263238"
      />
      <path
        d="M18.1191 7.4213C17.6462 7.4213 17.1927 7.60915 16.8583 7.94353C16.5239 8.27791 16.3361 8.73142 16.3361 9.2043V17.3883L11.5041 22.2024C11.3175 22.3623 11.1659 22.559 11.0588 22.7802C10.9518 23.0014 10.8917 23.2423 10.8822 23.4879C10.8727 23.7335 10.9141 23.9783 11.0037 24.2071C11.0934 24.4359 11.2293 24.6437 11.4031 24.8175C11.5769 24.9913 11.7847 25.1272 12.0135 25.2169C12.2423 25.3065 12.4871 25.3479 12.7327 25.3384C12.9782 25.3289 13.2192 25.2688 13.4404 25.1618C13.6616 25.0547 13.8583 24.9031 14.0181 24.7165L19.3672 19.3675C19.7031 19.0383 19.8954 18.5897 19.9021 18.1194V9.2043C19.9021 8.73142 19.7142 8.27791 19.3798 7.94353C19.0455 7.60915 18.5919 7.4213 18.1191 7.4213Z"
        fill="#263238"
      />
    </svg>
  );

  const successSvg = (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2068 18.9928C15.8948 18.6808 15.4718 18.5056 15.0306 18.5056C14.5894 18.5056 14.1663 18.6808 13.8544 18.9928C13.5424 19.3047 13.3672 19.7278 13.3672 20.169C13.3672 20.6102 13.5424 21.0333 13.8544 21.3452L18.8243 26.3151C18.9791 26.4686 19.1626 26.5901 19.3645 26.6725C19.5663 26.755 19.7824 26.7968 20.0005 26.7955C20.2273 26.7883 20.4502 26.7346 20.6553 26.6377C20.8605 26.5408 21.0436 26.4028 21.1932 26.2323L32.7896 12.9792C33.0574 12.6468 33.1865 12.2238 33.15 11.7985C33.1136 11.3732 32.9143 10.9784 32.5939 10.6964C32.2734 10.4144 31.8565 10.267 31.43 10.2849C31.0035 10.3028 30.6004 10.4846 30.3047 10.7925L20.0005 22.7202L16.2068 18.9928Z"
        fill="#263238"
      />
      <path
        d="M34.9094 18.5118C34.47 18.5118 34.0486 18.6863 33.738 18.997C33.4273 19.3077 33.2528 19.7291 33.2528 20.1684C33.2528 23.6834 31.8565 27.0543 29.371 29.5397C26.8856 32.0252 23.5147 33.4214 19.9997 33.4214C17.3824 33.4202 14.824 32.6441 12.6472 31.1909C10.4704 29.7376 8.77266 27.6724 7.76801 25.2556C6.76336 22.8387 6.49682 20.1785 7.002 17.6104C7.50718 15.0423 8.76146 12.6813 10.6067 10.8251C11.8337 9.58157 13.2965 8.59531 14.9094 7.924C16.5222 7.25269 18.2528 6.90981 19.9997 6.91543C21.0591 6.92206 22.1145 7.04427 23.1473 7.27988C23.3635 7.34674 23.591 7.36861 23.8159 7.34416C24.0408 7.31971 24.2584 7.24945 24.4551 7.13771C24.6518 7.02597 24.8235 6.87512 24.9597 6.69447C25.0959 6.51381 25.1936 6.30718 25.2469 6.0873C25.3002 5.86742 25.3079 5.63897 25.2694 5.41601C25.231 5.19306 25.1474 4.98033 25.0236 4.79095C24.8998 4.60157 24.7386 4.43955 24.5498 4.31487C24.361 4.1902 24.1487 4.10551 23.9259 4.06603C22.639 3.76327 21.3218 3.60765 19.9997 3.60217C16.7268 3.61918 13.5323 4.60529 10.8192 6.43608C8.10617 8.26687 5.99623 10.8603 4.75566 13.889C3.5151 16.9178 3.19949 20.2462 3.84869 23.4541C4.49788 26.6621 6.08277 29.6058 8.40336 31.9139C11.4792 34.9912 15.6489 36.7245 19.9997 36.7347C24.3934 36.7347 28.6071 34.9893 31.7139 31.8826C34.8206 28.7758 36.566 24.5621 36.566 20.1684C36.566 19.7291 36.3915 19.3077 36.0808 18.997C35.7701 18.6863 35.3487 18.5118 34.9094 18.5118Z"
        fill="#263238"
      />
    </svg>
  );

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: any) => {};
  };

  const CustomToggle = React.forwardRef(
    (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
      <b
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
        className="float-right cursor-pointer weird-margin"
      >
        {props.children}
      </b>
    )
  );

  const menu = (
    <Dropdown.Menu>
      <Dropdown.Item eventKey="1" onClick={() => setReceipt(true)}>
        View Receipt
      </Dropdown.Item>
      <Dropdown.Item eventKey="2" onClick={() => setDetails(true)}>
        View Details
      </Dropdown.Item>
      <Dropdown.Item eventKey="3">View Invoice</Dropdown.Item>
      <Dropdown.Item eventKey="4" onClick={() => setKeys(true)}>
        View Keys
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="fw-bold">Transactions</h3>
              <Form.Select aria-label="Time interval" className="w-auto">
                <option>Time Interval</option>
                <option value="all">All</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </Form.Select>
            </div>

            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>DATE</th>
                  <th className="text-center">AMOUNT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0
                  ? orders.map((order: any, index: any) => {
                      const d = new Date(order.created_at);
                      const date = d.toLocaleString("en-US", {
                        day: "numeric",
                        year: "numeric",
                        month: "short",
                      });
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="transaction_indicator_holder d-flex align-items-center justify-content-center me-4">
                                {order.status.includes("payment_successful")
                                  ? successSvg
                                  : pendingSvg}
                              </div>

                              <div className="d-flex flex-column">
                                <b>{order.company_name}</b>
                                <span className="text-small">
                                  {order.product.name}
                                </span>
                                <span
                                  className={`text-small ${
                                    order.status.includes("payment_successful")
                                      ? `text-success`
                                      : `text-theme`
                                  }`}
                                >
                                  {order.status.includes("payment_successful")
                                    ? "Success"
                                    : "Pending"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="text-muted text-small">
                                {date}
                              </span>
                            </div>
                          </td>
                          <td className="text-center">
                            {order.amount ? "#" + order.amount / 100 : "-"}
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                as={CustomToggle}
                                id="dropdown-custom-components"
                                split
                              >
                                ...
                              </Dropdown.Toggle>
                              {menu}
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal
        show={details}
        onHide={() => setDetails(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card">
          <Card.Body className="p-4">
            <div className="text-center">
              <b className="fs-5">DETAILS</b>
            </div>
            <hr className="my-3" />

            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Company Name</span>
              </Col>
              <Col xs={6}>
                <b>Business Name Plc</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Company Address</span>
              </Col>
              <Col xs={6}>
                <b>28, ayeni street, Lagos</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Product</span>
              </Col>
              <Col xs={6}>
                <b>Sage Business Cloud</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Provider</span>
              </Col>
              <Col xs={6}>
                <b>Sage</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Date</span>
              </Col>
              <Col xs={6}>
                <b>15-08-2022</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Status</span>
              </Col>
              <Col xs={6}>
                <span className="text-success">Success</span>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Total Value</span>
              </Col>
              <Col xs={6}>
                <b>$200</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Naira Rate</span>
              </Col>
              <Col xs={6}>
                <b>#600</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Amount Paid</span>
              </Col>
              <Col xs={6}>
                <b>#120,000</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Transaction No</span>
              </Col>
              <Col xs={6}>
                <b>PM001</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Reference No</span>
              </Col>
              <Col xs={6}>
                <b>3344224354527687</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Invoice No</span>
              </Col>
              <Col xs={6}>
                <b>-</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6}>
                <span className="text-muted">Reason</span>
              </Col>
              <Col xs={6}>
                <b>Software license</b>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setDetails(false)}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={receipt}
        onHide={() => setReceipt(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card border-0">
          <div
            className="text-center bg-theme text-white p-3"
            style={{ borderRadius: "30px 30px 0px 0px" }}
          >
            <b className="fs-5">Paymit</b>
          </div>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <b>Receipt</b>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 16C25.9185 16 25.6005 16.1317 25.3661 16.3661C25.1317 16.6005 25 16.9185 25 17.25V22.25C25 22.5815 24.8683 22.8995 24.6339 23.1339C24.3995 23.3683 24.0815 23.5 23.75 23.5H6.25C5.91848 23.5 5.60054 23.3683 5.36612 23.1339C5.1317 22.8995 5 22.5815 5 22.25V17.25C5 16.9185 4.8683 16.6005 4.63388 16.3661C4.39946 16.1317 4.08152 16 3.75 16C3.41848 16 3.10054 16.1317 2.86612 16.3661C2.6317 16.6005 2.5 16.9185 2.5 17.25V22.25C2.5 23.2446 2.89509 24.1984 3.59835 24.9017C4.30161 25.6049 5.25544 26 6.25 26H23.75C24.7446 26 25.6984 25.6049 26.4017 24.9017C27.1049 24.1984 27.5 23.2446 27.5 22.25V17.25C27.5 16.9185 27.3683 16.6005 27.1339 16.3661C26.8995 16.1317 26.5815 16 26.25 16ZM14.1125 18.1375C14.2314 18.2513 14.3716 18.3405 14.525 18.4C14.6746 18.4661 14.8364 18.5003 15 18.5003C15.1636 18.5003 15.3254 18.4661 15.475 18.4C15.6284 18.3405 15.7686 18.2513 15.8875 18.1375L20.8875 13.1375C21.1229 12.9021 21.2551 12.5829 21.2551 12.25C21.2551 11.9171 21.1229 11.5979 20.8875 11.3625C20.6521 11.1271 20.3329 10.9949 20 10.9949C19.6671 10.9949 19.3479 11.1271 19.1125 11.3625L16.25 14.2375V2.25C16.25 1.91848 16.1183 1.60054 15.8839 1.36612C15.6495 1.1317 15.3315 1 15 1C14.6685 1 14.3505 1.1317 14.1161 1.36612C13.8817 1.60054 13.75 1.91848 13.75 2.25V14.2375L10.8875 11.3625C10.771 11.246 10.6326 11.1535 10.4803 11.0904C10.328 11.0273 10.1648 10.9949 10 10.9949C9.83518 10.9949 9.67197 11.0273 9.51969 11.0904C9.36741 11.1535 9.22905 11.246 9.1125 11.3625C8.99595 11.479 8.9035 11.6174 8.84043 11.7697C8.77735 11.922 8.74489 12.0852 8.74489 12.25C8.74489 12.4148 8.77735 12.578 8.84043 12.7303C8.9035 12.8826 8.99595 13.021 9.1125 13.1375L14.1125 18.1375Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="dotted my-3"></div>

            <b className="text-small">15 Aug, 2022 - 15:30</b>

            <Row className="mt-3">
              <Col xs={5}>
                <span className="text-muted">Product</span>
              </Col>
              <Col xs={7}>
                <b>Sage Business Cloud</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Name</span>
              </Col>
              <Col xs={7}>
                <b>Peter Tinubu</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Temp Key</span>
              </Col>
              <Col xs={7}>
                <b>KWYZ125VSY732NA</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">License Key</span>
              </Col>
              <Col xs={7}>
                <b>KWYZ125VSY732NA</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Transaction No</span>
              </Col>
              <Col xs={7}>
                <b>PM0001</b>
              </Col>
            </Row>

            <div className="dotted my-3"></div>

            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Total Amount</span>
              </Col>
              <Col xs={7}>
                <b>127,000 NGN</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Product Value</span>
              </Col>
              <Col xs={7}>
                <b>200 USD</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Exchange Rate</span>
              </Col>
              <Col xs={7}>
                <b>1 USD = 600NGN</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Service Charge</span>
              </Col>
              <Col xs={7}>
                <b>$10</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Interest Change</span>
              </Col>
              <Col xs={7}>
                <b>%1 = 2 USD</b>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={5}>
                <span className="text-muted">Reason</span>
              </Col>
              <Col xs={7}>
                <b>Software Purchase</b>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <svg
                width="145"
                height="47"
                viewBox="0 0 145 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.09766 47H0V0H5.09766V47ZM10.1953 46.9666H7.60603V0H10.1953V46.9666ZM17.8013 46.9666H15.293V0H17.8013V46.9666ZM30.505 46.9666H27.9967V0H30.505V46.9666ZM43.2087 46.9666H38.192V0H43.2087V46.9666ZM53.404 46.9666H50.8956V0H53.404V46.9666ZM58.5017 46.9666H55.9933V0H58.5017V46.9666ZM63.5993 46.9666H61.091V0H63.5993V46.9666ZM76.303 46.9666H71.2054V0H76.303V46.9666ZM89.0067 46.9666H83.909V0H89.0067V46.9666ZM99.202 46.9666H94.1043V0H99.202V46.9666ZM109.397 46.9666H104.3V0H109.397V46.9666ZM117.003 46.9666H111.906V0H117.003V46.9666ZM132.296 46.9666H124.69V0H132.296V46.9666ZM137.394 46.9666H134.805V0H137.394V46.9666ZM145 47H139.902V0H145V47Z"
                  fill="black"
                />
              </svg>
            </div>
          </Card.Body>
        </Card>
      </Modal>

      <Modal
        show={keys}
        onHide={() => setKeys(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        dialogClassName="details-modal border-0"
      >
        <Card className="details_modal_card p-3">
          <Card.Body>
            <div className="text-center">
              <b className="fs-5">KEYS</b>
            </div>
            <hr className="mt-3 mb-4" />
            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>TEMPORARY KEY</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    className="form_inputs keys_input me-2 fw-bold"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                  />
                  <div
                    className="d-flex align-items-center"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(tempKey);
                        alert("Copied to clipboard");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <div
                      className="d-grid cursor-pointer"
                      style={{
                        width: 40,
                        height: 40,
                        background: "#263238",
                        borderRadius: "10px",
                        placeContent: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_336_7695)">
                          <path
                            d="M16 1H4C2.895 1 2 1.895 2 3V17H4V3H16V1ZM19 5H8C6.895 5 6 5.895 6 7V21C6 22.105 6.895 23 8 23H19C20.105 23 21 22.105 21 21V7C21 5.895 20.105 5 19 5ZM19 21H8V7H19V21Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_336_7695">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </InputGroup>
                <Form.Label>EXPIRY DATE</Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs keys_input mb-3"
                  placeholder="DD/MM/YYYY"
                  value={tempExpiry}
                  onChange={(e) => setTempExpiry(e.target.value)}
                />

                <hr className="mt-4 mb-3" />

                <Form.Label>LICENSE KEY</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    className="form_inputs keys_input me-2 fw-bold"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                  />
                  <div
                    className="d-flex align-items-center"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(licenseKey);
                        alert("Copied to clipboard");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <div
                      className="d-grid cursor-pointer"
                      style={{
                        width: 40,
                        height: 40,
                        background: "#263238",
                        borderRadius: "10px",
                        placeContent: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_336_7695)">
                          <path
                            d="M16 1H4C2.895 1 2 1.895 2 3V17H4V3H16V1ZM19 5H8C6.895 5 6 5.895 6 7V21C6 22.105 6.895 23 8 23H19C20.105 23 21 22.105 21 21V7C21 5.895 20.105 5 19 5ZM19 21H8V7H19V21Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_336_7695">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </InputGroup>
                <Form.Label>EXPIRY DATE</Form.Label>
                <Form.Control
                  type="text"
                  className="form_inputs keys_input mb-3"
                  placeholder="DD/MM/YYYY"
                  value={licenseExpiry}
                  onChange={(e) => setLicenseExpiry(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div className="text-right mt-5">
              <button
                className="btn btn_theme btn_theme2 w-50"
                onClick={() => setKeys(false)}
              >
                Done
              </button>
            </div>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
