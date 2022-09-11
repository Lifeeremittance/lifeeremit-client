import React from "react";
import { Container, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Signup: React.FC<Props> = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center w-100 vh-100 body-bg"
    >
      <b className="fs-4 paymit-logo">Paymit</b>
      <Form className="signup_form d-flex align-items-center flex-column bg-white">
        <div className="text-center mb-4">
          <b className="fs-6">Personal details</b>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="form_inputs mb-3"
          />
          <Form.Label className="fw-bold">Phone no</Form.Label>
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
            className="ps-3 py-3 mb-3 form_inputs"
            // error={
            //   phoneNumber
            //     ? isPossiblePhoneNumber(phoneNumber)
            //       ? undefined
            //       : "Invalid phone number"
            //     : "Phone number required"
            // }
          />
          <Form.Label className="fw-bold">Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Company name"
            className="form_inputs mb-3"
          />
          <Form.Label className="fw-bold">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Home Address"
            className="form_inputs mb-3"
          />

          <button className="btn btn_theme w-100 mb-4">
            Create My Profile
          </button>

          <div className="w-100 text-center">
            <Link to="/signin" className="link_theme">
              Sign in
            </Link>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};
