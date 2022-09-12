import React from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  ProgressBar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Country: React.FC<Props> = () => {
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
            <ProgressBar now={20} />

            <h3 className="fw-bold my-5">Select your country</h3>
            <Form>
              <InputGroup className="country_group">
                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-white border_left_country"
                >
                  <i className="fa fa-search fs-5"></i>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Country"
                  aria-describedby="basic-addon1"
                  className="border-start-0"
                  placeholder="Nigeria"
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className="bg-white border_right_country"
                >
                  🇳🇬 <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup>
              <div className="text-small">This is the currency you are making payment in.</div>
              <button
                className="btn btn_theme fw-bold w-25 mt-4"
                onClick={() => navigate("/products/provider")}
              >
                Continue
              </button>
            </Form>
            <div></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
