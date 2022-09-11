import React from "react";
import { Container, Col, Row, Dropdown, ProgressBar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Provider: React.FC<Props> = () => {
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
            <ProgressBar now={40} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Select Service Provider</h3>

            <div className="grid-4">
              <div className="grid-item providers_list selected d-flex align-items-center justify-content-center cursor-pointer">
                <img
                  src="https://download.logo.wine/logo/Sage_Group/Sage_Group-Logo.wine.png"
                  alt=""
                  width="116px"
                  height="75px"
                />
              </div>
              <div className="grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer">
                <img
                  src="https://logos-world.net/wp-content/uploads/2022/02/SAP-Symbol.png"
                  alt=""
                  width="116px"
                  height="45px"
                />
              </div>
              <div className="grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer">
                <img
                  src="https://cdn.vox-cdn.com/thumbor/VSSwGPlTwiV0AY5zL9Afu7KGpno=/0x28:640x388/1600x900/cdn.vox-cdn.com/assets/1311169/mslogo.jpg"
                  alt=""
                  width="136px"
                  height="85px"
                />
              </div>
              <div className="grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Oracle-logo.png"
                  alt=""
                  width="116px"
                  height="75px"
                />
              </div>
              <div className="grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer">
                <b>OTHERS</b>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={() => navigate("/products/product")}
              >
                Continue
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
