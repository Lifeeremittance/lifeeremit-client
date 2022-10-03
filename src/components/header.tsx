import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  type CustomToggleProps = {
    children: React.ReactNode;
    onClick: (event: any) => {};
  };

  const getInitials = () => {
    const fullName = sessionStorage.getItem("userFullName");
    // get first letter of fullName
    const firstLetter = fullName?.charAt(0);

    return firstLetter;
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
    <header className="d-flex align-items-center justify-content-end vh-15 body-bg p-3">
      <i className="fa fa-bell fs-3 me-3" aria-hidden="true"></i>
      <Dropdown>
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
          split
        >
          <div className="d-flex align-items-center">
            <div className="header_profile_img me-2 d-flex align-items-center justify-content-center text-white fs-4">
              {getInitials()}
            </div>
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">
            <div
              className="d-flex align-items-center"
              onClick={() => navigate("/edit")}
            >
              <i className="fw-bold fa fa-user me-2" aria-hidden="true"></i>
              Edit Profile
            </div>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <div
              className="d-flex align-items-center"
              onClick={() => navigate("/signin")}
            >
              <i className="fw-bold fa fa-sign-out me-2" aria-hidden="true"></i>
              <span className="text-red">Logout</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
};

export default Header;
