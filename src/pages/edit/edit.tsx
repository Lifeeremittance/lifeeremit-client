import React from "react";
import { Container, Col, Row, Dropdown, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Edit: React.FC<Props> = () => {
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
                  <div
                    className="d-flex align-items-center"
                    onClick={() => navigate("/edit")}
                  >
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="me-2"
                    >
                      <path
                        d="M5.84846 13.5498C7.28813 13.4338 8.73442 13.4338 10.1741 13.5498C10.9581 13.5955 11.7383 13.6936 12.5099 13.8434C14.1796 14.1815 15.2697 14.7331 15.7368 15.6228C16.0877 16.3171 16.0877 17.1437 15.7368 17.8381C15.2697 18.7278 14.2229 19.3149 12.4926 19.6174C11.7216 19.7729 10.9412 19.874 10.1568 19.9199C9.43008 20 8.70338 20 7.96802 20H6.64438C6.36754 19.9644 6.09935 19.9466 5.83981 19.9466C5.05538 19.9063 4.27477 19.8082 3.50397 19.653C1.83428 19.3327 0.744223 18.7633 0.277055 17.8737C0.0967112 17.529 0.00163408 17.144 0.000104218 16.7527C-0.00354431 16.3589 0.0886575 15.9705 0.268404 15.6228C0.72692 14.7331 1.81698 14.1548 3.50397 13.8434C4.27816 13.6915 5.06144 13.5934 5.84846 13.5498ZM8.00263 0C10.9028 0 13.2539 2.41782 13.2539 5.40036C13.2539 8.38289 10.9028 10.8007 8.00263 10.8007C5.10241 10.8007 2.75131 8.38289 2.75131 5.40036C2.75131 2.41782 5.10241 0 8.00263 0Z"
                        fill="#263238"
                        fill-opacity="0.9"
                      />
                    </svg>
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
            <div className="media-upload d-flex align-items-center justify-content-center mb-4">
              <svg
                width="32"
                height="40"
                viewBox="0 0 32 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8756 26.8038C14.6349 26.5814 17.407 26.5814 20.1664 26.8038C21.669 26.8914 23.1645 27.0794 24.6434 27.3665C27.8436 28.0145 29.9329 29.0717 30.8283 30.777C31.5008 32.1078 31.5008 33.6921 30.8283 35.023C29.9329 36.7282 27.9265 37.8536 24.6102 38.4334C23.1325 38.7314 21.6366 38.9251 20.1332 39.0132C18.7403 39.1666 17.3475 39.1666 15.9381 39.1666H13.4011C12.8705 39.0984 12.3564 39.0643 11.859 39.0643C10.3555 38.987 8.85932 38.7989 7.38196 38.5016C4.18172 37.8877 2.09244 36.7964 1.19704 35.0912C0.851379 34.4306 0.669148 33.6927 0.666215 32.9426C0.659222 32.1879 0.835942 31.4434 1.18046 30.777C2.05928 29.0717 4.14856 27.9634 7.38196 27.3665C8.86583 27.0753 10.3671 26.8873 11.8756 26.8038ZM16.0044 0.833313C21.5631 0.833313 26.0694 5.46747 26.0694 11.184C26.0694 16.9005 21.5631 21.5347 16.0044 21.5347C10.4456 21.5347 5.93937 16.9005 5.93937 11.184C5.93937 5.46747 10.4456 0.833313 16.0044 0.833313Z"
                  fill="white"
                />
              </svg>
            </div>

            <Form>
              <Form.Group controlId="formForProfile">
                <div className="grid-2">
                  <div>
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Peter Tinubu"
                      className="form_inputs w-100"
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">
                      Company Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Business Name Plc"
                      className="form_inputs w-100"
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Petertinubu@gmail.com"
                      className="form_inputs w-100"
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">
                      Phone number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="08139932932"
                      className="form_inputs w-100"
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">
                      Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ikoyi, Lagos"
                      className="form_inputs w-100"
                    />
                  </div>
                </div>
              </Form.Group>
            </Form>
            <button className="btn btn_theme mt-4 w-auto px-5">Save Changes</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
