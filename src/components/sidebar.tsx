// import React from "react";
import { Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Col md={4} lg={3} className="p-0">
      <div className="sidebar_menu body-bg vh-100 text-center">
        <h3 className="fw-bold pt-5 cursor-pointer" onClick={() => navigate("/signin")}>
          Paymit
        </h3>
        <h5 className="my-5 fw-bold">Welcome User</h5>

        <ul className="nav flex-column pt-5 justify-content-between side-specific-height align-items-start ps-5">
          <li className="nav-item mb-4">
            <NavLink
              to="/products"
              className="nav-link text-dark"
              aria-current="page"
            >
              <i className={`fa fa-briefcase icli fs-5 align-middle me-3`}></i>
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
  );
};

export default Sidebar;
