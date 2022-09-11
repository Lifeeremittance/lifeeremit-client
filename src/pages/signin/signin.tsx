import React from "react";
import { Container, Form } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Signin: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center w-100 vh-100 body-bg"
    >
      <b className="fs-4 paymit-logo">Paymit</b>
      <Form className="signup_form d-flex align-items-center flex-column bg-white p-4">
        <div className="text-center mb-4">
          <b className="fs-6">Login to your account</b>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="form_inputs mb-4"
          />

          <button
            className="btn btn_theme w-100 mb-4"
            onClick={() => navigate("/products/country")}
          >
            Continue
          </button>

          <div className="w-100">
            <Link to="/signup" className="link_theme">
              New to Paymit?
            </Link>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};
