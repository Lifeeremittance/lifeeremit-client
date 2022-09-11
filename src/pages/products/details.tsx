import React from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  ProgressBar,
  Form,
} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Details: React.FC<Props> = () => {
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
            <ProgressBar now={80} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Kindly fill</h3>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  className="form_inputs mb-3 w-100"
                />
                <Form.Label>
                  Company Address <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Address"
                  className="form_inputs mb-3 w-100"
                />
                <Form.Label>
                  Contact Name <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a contact name"
                  className="form_inputs mb-3 w-100"
                />
                <Row>
                  <Col md={6}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      className="form_inputs mb-3 w-100"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      defaultCountry="NG"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      withCountryCallingCode
                      international
                      countryCallingCodeEditable={false}
                      initialValueFormat="national"
                      // value={phoneNumber}
                      onChange={() => console.log("changed")}
                      className="ps-3 py-3 mb-3 form_inputs w-100"
                      // error={
                      //   phoneNumber
                      //     ? isPossiblePhoneNumber(phoneNumber)
                      //       ? undefined
                      //       : "Invalid phone number"
                      //     : "Phone number required"
                      // }
                    />
                  </Col>
                </Row>
                <Form.Label>
                  Reason For Payment
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter reason for payment"
                  className="form_inputs mb-3 w-100 h-auto"
                />
                <Form.Label>
                  Reference Number
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1234567890"
                  className="form_inputs mb-3 w-100"
                />
                <Form.Label>
                  Invoice Number
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Invoice Number"
                  className="form_inputs mb-5 w-100"
                />
                <div className="d-flex align-items-center justify-content-center to_upload">
                  <span className="d-flex flex-column align-items-center">
                    <svg
                      width="50"
                      height="34"
                      viewBox="0 0 50 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.3125 12.5833C38.8958 5.39583 32.5833 0 25 0C18.9792 0 13.75 3.41667 11.1458 8.41667C4.875 9.08333 0 14.3958 0 20.8333C0 27.7292 5.60417 33.3333 12.5 33.3333H39.5833C45.3333 33.3333 50 28.6667 50 22.9167C50 17.4167 45.7292 12.9583 40.3125 12.5833ZM39.5833 29.1667H12.5C7.89583 29.1667 4.16667 25.4375 4.16667 20.8333C4.16667 16.5625 7.35417 13 11.5833 12.5625L13.8125 12.3333L14.8542 10.3542C16.8333 6.54167 20.7083 4.16667 25 4.16667C30.4583 4.16667 35.1667 8.04167 36.2292 13.3958L36.8542 16.5208L40.0417 16.75C43.2917 16.9583 45.8333 19.6875 45.8333 22.9167C45.8333 26.3542 43.0208 29.1667 39.5833 29.1667ZM16.6667 18.75H21.9792V25H28.0208V18.75H33.3333L25 10.4167L16.6667 18.75Z"
                        fill="#C7C7CC"
                      />
                    </svg>
                    <span className="text-small">Upload Invoice</span>
                  </span>
                </div>
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={() => navigate("/products/payment")}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
