import { useEffect } from "react";
import Cookies from "universal-cookie";
import { Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../assets/img/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  // use useEffect hook to check if jwt is in cookie
  useEffect(() => {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    if (!jwt) {
      window.location.href = "/signin";
    }
  }, []);

  return (
    <Col md={4} lg={3} className="p-0">
      <div className="sidebar_menu body-bg vh-100">
        {/* <h3
          className="fw-bold pt-5 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Paymit
        </h3> */}

        <h5 className="pt-5 ps-5 fw-bold">Welcome {sessionStorage.getItem("userFullName")?.split(" ")[0]}</h5>

        <img
          src={logoImage}
          alt="logo"
          className="ps-5 img-fluid cursor-pointer my-3 position-relative"
          onClick={() => navigate("/signin")}
        />

        <ul className="nav flex-column justify-content-between side-specific-height align-items-start ps-5">
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
