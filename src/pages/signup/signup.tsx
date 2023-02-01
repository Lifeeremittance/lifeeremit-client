import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/user";
import { toast } from "react-toastify";
import logoImage from "../../assets/img/logo.png";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Signup: React.FC<Props> = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await createUser(
      fullName,
      email,
      phoneNumber,
      companyName,
      address
    );
    if (response?.data?.status === "success") {
      toast.success("Signup successful");
      navigate("/signin");
    } else {
      toast.error(response);
    }
    setLoading(false);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center w-100 vh-100 body-bg position-relative"
    >
      <svg
        width="505"
        height="542"
        viewBox="0 0 505 542"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-1 d-none d-md-block"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M733.48 -60.0636C878.093 62.7752 739.438 323.838 581.809 509.409C493.454 613.425 413.559 433.854 332.5 365C193.637 247.045 -109.654 228.823 41.7079 50.6307C241.585 -184.676 550.107 -215.826 733.48 -60.0636Z"
          fill="url(#paint0_linear_50_19)"
          fillOpacity="0.6"
        />
        <defs>
          <linearGradient
            id="paint0_linear_50_19"
            x1="656.313"
            y1="-125.611"
            x2="170.904"
            y2="593.816"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D1D1E9" />
            <stop offset="1" stopColor="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        width="331"
        height="589"
        viewBox="0 0 331 589"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-2 d-none d-md-block"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-120.766 588.371C-320.009 600.807 -401.479 365.215 -414.098 163.046C-421.171 49.7251 -266.72 46.2394 -155.04 39.2686C36.2806 27.3269 317.915 -77.5319 330.033 116.599C346.034 372.953 131.877 572.602 -120.766 588.371Z"
          fill="url(#paint0_linear_50_20)"
          fillOpacity="0.3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_50_20"
            x1="-14.4496"
            y1="581.735"
            x2="-122.545"
            y2="-133.817"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D1D1E9" />
            <stop offset="1" stopColor="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      {/* <b
        className="fs-3 paymit-logo cursor-pointer"
        onClick={() => navigate("/")}
      >
        Paymit
      </b> */}
      <img
        src={logoImage}
        alt="logo"
        className="paymit-signUp img-fluid cursor-pointer"
        onClick={() => navigate("/")}
      />
      <Form className="signup_form d-flex align-items-center flex-column bg-white mt-5">
        <div className="text-center my-5">
          <b className="fs-5">Personal details</b>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="fw-bold">Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="form_inputs mb-3 w-md-100"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="form_inputs mb-3 w-md-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="ps-3 py-3 mb-3 form_inputs w-md-100"
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
            className="form_inputs mb-3 w-md-100"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Form.Label className="fw-bold">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Home Address"
            className="form_inputs mb-3 w-md-100"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            className="btn btn_theme w-100 mb-4"
            onClick={handleSubmit}
            disabled={loading}
          >
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
