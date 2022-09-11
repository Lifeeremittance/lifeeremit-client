import React from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  ProgressBar,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Payment: React.FC<Props> = () => {
  const [successful, setSuccessful] = React.useState(false);
  const [unsuccessful, setUnsuccessful] = React.useState(false);
  const navigate = useNavigate();

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

  const paystack = () => {
    let handler = PaystackPop.setup({
      key: process.env["REACT_APP_PAYSTACK_PUBLIC_KEY"],
      email: "aland6209@gmail.com",
      amount: 500000,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      //   label: name,
      onClose: () => {
        console.log("Window closed.");
      },
      callback: (response: { reference: string }) => {
        let message = "Payment complete! Reference: " + response.reference;
        console.log(message);
        setSuccessful(true);
      },
    });

    handler.openIframe();
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Col md={3} xl={2} className="p-0">
          <div className="sidebar_menu body-bg vh-100 text-center">
            <h4 className="fw-bold pt-5">Paymit</h4>
            <h5 className="my-5 fw-bold">Welcome User</h5>

            <ul className="nav flex-column pt-4 justify-content-between side-specific-height">
              <li className="nav-item mb-3">
                <NavLink
                  to="/products"
                  className="nav-link text-dark"
                  aria-current="page"
                >
                  <i
                    className={`fa fa-briefcase icli fs-5 align-middle me-3`}
                  ></i>
                  <span className="align-middle fs-6">Products</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/history"
                  className="nav-link text-dark"
                  aria-current="page"
                >
                  <i
                    className={`fa fa-file-text-o icli fs-5 align-middle me-3`}
                  ></i>
                  <span className="align-middle fs-6">History</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9} xl={10} className="p-0 body-bg">
          <header className="d-flex align-items-center justify-content-end vh-15 body-bg p-3">
            <i className="fa fa-bell fs-3 me-3" aria-hidden="true"></i>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
                split
              >
                <div className="d-flex align-items-center">
                  <div className="header_profile_img me-2"></div>
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <div className="d-flex align-items-center">
                    <i
                      className="fw-bold fa fa-user me-2"
                      aria-hidden="true"
                    ></i>
                    Edit Profile
                  </div>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  <div className="d-flex align-items-center">
                    <i
                      className="fw-bold fa fa-sign-out me-2"
                      aria-hidden="true"
                    ></i>
                    <span className="text-red">Logout</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </header>

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={100} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Enter Amount</h3>

            <div className="d-flex align-items-center justify-content-center">
              <span className="rate_box p-3 fw-bold">
                <span>Rate:</span>{" "}
                <span className="text-theme">1USD = 600NGN</span>
              </span>
            </div>

            <Form>
              <Form.Group controlId="formForPaystack">
                <div>
                  <Form.Text className="fw-bold fs-6 text-dark">
                    Product Amount
                  </Form.Text>
                </div>
                <Form.Text>The currency of your invoice</Form.Text>
                <Form.Control
                  type="text"
                  placeholder="Currency"
                  className="form_inputs w-50 mt-2"
                  style={{ marginBottom: "20vh" }}
                />
                <Form.Control
                  type="text"
                  placeholder="Amount"
                  className="form_inputs mb-3 w-50"
                />
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-25 fs-5"
                onClick={paystack}
              >
                Pay
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        show={successful}
        onHide={() => setSuccessful(false)}
        backdrop="static"
        centered
      >
        <Card className="bg-white border-0">
          <Card.Body className="d-flex align-items-center flex-column">
            <svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-5 mb-3"
            >
              <path
                d="M49 0C39.3087 0 29.8351 2.8738 21.7771 8.25799C13.7191 13.6422 7.43862 21.2949 3.72992 30.2485C0.0212308 39.2021 -0.949132 49.0543 0.941543 58.5594C2.83222 68.0645 7.49902 76.7954 14.3518 83.6482C21.2046 90.501 29.9355 95.1678 39.4406 97.0585C48.9457 98.9491 58.7979 97.9788 67.7515 94.2701C76.7051 90.5614 84.3578 84.2809 89.742 76.2229C95.1262 68.1649 98 58.6913 98 49C98 36.0044 92.8375 23.541 83.6482 14.3518C74.459 5.16248 61.9956 0 49 0ZM81.0031 32.5544L40.7619 72.765L16.9969 49C16.1847 48.1878 15.7284 47.0862 15.7284 45.9375C15.7284 44.7888 16.1847 43.6872 16.9969 42.875C17.8091 42.0628 18.9107 41.6065 20.0594 41.6065C21.2081 41.6065 22.3097 42.0628 23.1219 42.875L40.8231 60.5762L74.9394 26.4906C75.3416 26.0884 75.819 25.7694 76.3445 25.5518C76.8699 25.3341 77.4331 25.2221 78.0019 25.2221C78.5706 25.2221 79.1338 25.3341 79.6593 25.5518C80.1848 25.7694 80.6622 26.0884 81.0644 26.4906C81.4666 26.8928 81.7856 27.3702 82.0032 27.8957C82.2209 28.4212 82.3329 28.9844 82.3329 29.5531C82.3329 30.1219 82.2209 30.6851 82.0032 31.2105C81.7856 31.736 81.4666 32.2134 81.0644 32.6156L81.0031 32.5544Z"
                fill="#72C487"
              />
            </svg>
            <b className="fs-5 mb-5">Payment Successful</b>
            <button
              className="btn btn_theme fw-bold w-50 px-5 fs-5 mt-4 mb-3"
              onClick={() => setSuccessful(false)}
            >
              Okay
            </button>
          </Card.Body>
        </Card>
      </Modal>
      <Modal
        show={unsuccessful}
        onHide={() => setUnsuccessful(false)}
        backdrop="static"
        centered
      >
        <Card className="bg-white border-0">
          <Card.Body className="d-flex align-items-center flex-column">
            <svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49 98C76.2222 98 98 76.2222 98 49C98 21.7778 76.2222 0 49 0C21.7778 0 0 21.7778 0 49C0 76.2222 21.7778 98 49 98ZM49 10.8889C70.2333 10.8889 87.1111 27.7667 87.1111 49C87.1111 70.2333 70.2333 87.1111 49 87.1111C27.7667 87.1111 10.8889 70.2333 10.8889 49C10.8889 27.7667 27.7667 10.8889 49 10.8889Z"
                fill="#FF0000"
              />
            </svg>

            <b className="fs-5 mb-5">Payment Failed</b>
            <button
              className="btn btn_theme fw-bold w-50 px-5 fs-5 mt-4 mb-3"
              onClick={() => setUnsuccessful(false)}
            >
              Okay
            </button>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
