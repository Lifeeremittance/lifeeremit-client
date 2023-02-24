import React, { useState } from "react";
import { Row, Col, Collapse, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { subscribeToNewsletter } from "../../services/auth";
import logoImage from "../../assets/img/logo.png";
import currencyImage from "../../assets/img/currency.png";
import ratesImage from "../../assets/img/rates.png";
import renewalImage from "../../assets/img/renewal.png";
import hamburger from "../../assets/img/hamburger.svg";
import close from "../../assets/img/X.svg";
import { ProductCalculator } from "components/ProductCalculator";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Landing: React.FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [open4, setOpen4] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  const [selected, setSelected] = useState<number>(1);

  const [email, setEmail] = useState<string>("");

  // const [country, setCountry] = useState<string>("");
  // const [countries] = useState<any>([]);

  const navigate = useNavigate();
 
  const handleClick = () => {
    setNav(!nav);
  };

  let displayedImage = currencyImage;
  if (selected === 1) displayedImage = currencyImage;
  else if (selected === 2) displayedImage = renewalImage;
  else if (selected === 3) displayedImage = ratesImage;

  const signUpToNewsletter = async () => {
    const response = await subscribeToNewsletter(email);

    console.log(response);
    if (response?.status === 201) {
      setEmail("");
      toast.success(response.data.data);
    }
  };

  return (
    <div className="vw-100 vh-100 body-bg y-scroll px-0 position-relative">
      <svg
        width="308"
        height="589"
        viewBox="0 0 308 589"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-143.767 588.371C-343.009 600.807 -424.48 365.215 -437.099 163.046C-444.172 49.7251 -289.721 46.2394 -178.04 39.2686C13.2801 27.3269 294.915 -77.5319 307.032 116.599C323.033 372.953 108.877 572.602 -143.767 588.371Z"
          fill="url(#paint0_linear_22_206)"
          fill-opacity="0.3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_22_206"
            x1="-37.4501"
            y1="581.735"
            x2="-145.546"
            y2="-133.817"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#D1D1E9" />
            <stop offset="1" stop-color="#D1D1E9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="vh-10 d-none d-md-flex align-items-center px-5">
        <Col md={4}>
          {/* <b className="fs-4">Lifee Remit</b> */}
          <a className="m-0" href="/">
          <img src={logoImage} alt="logo" className="logo img-fluid" />
          </a>
        </Col>
        <Col
          md={4}
          className="justify-content-center align-items-center d-flex"
        >
          <a className="m-0 text-theme no-underline" href="/">
            Home
          </a>
          <a className="m-0 text-muted no-underline mx-5" href="/about">
            About Us
          </a>
          <a className="m-0 text-muted no-underline" href="/contact">
            Contact
          </a>
        </Col>
        <Col md={4} className="text-right">
        <a className="m-0 text-muted no-underline mx-3" href="/signin">
            Sign in
          </a>
          <button
            className="btn btn_theme w-auto px-4 rounded"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </Col>
      </div>

      {/* mobile nav  */}
    
      <div className="vh-10 d-flex d-md-none align-items-center justify-content-between px-3 mb-5">
        <Col md={4}>
        <a className="m-0" href="/">
          <img src={logoImage} alt="logo" className="logo img-fluid" />         
          </a>
        </Col>
          <div onClick={handleClick} className="cursor-pointer">
          <img src={hamburger} alt="logo" className="" />
      </div>
      </div>

      <div className={
        !nav ? "d-none" : "h-75 w-100 d-md-none align-items-center justfiy-content-center px-3 bg-white position-fixed mobile-nav"}>
        <div className="d-flex justify-content-between align-items-center">

        <Col md={4}>
          <a className="m-0" href="/">
          <img src={logoImage} alt="logo" className="logo img-fluid" />         
          </a>
        </Col>
          <div onClick={handleClick} className="cursor-pointer">
          <img src={close} alt="logo" className="" />
      </div>
        </div>
        <Col
          md={4}
          className="justify-content-center align-items-center d-flex flex-column fw-bold fs-2 my-4"
        >
          <a className="m-0 text-theme no-underline" href="/">
            Home
          </a>
          <a className="m-0 text-muted no-underline my-3" href="/about">
            About Us
          </a>
          <a className="m-0 text-muted no-underline" href="/contact">
            Contact
          </a>
        </Col>
        <Col md={4} className="text-center mt-5">
        <a className="text-muted no-underline mx-3 fw-bold" href="/signin">
            Sign in
          </a>
          <button
            className="btn btn_theme w-auto px-4 rounded"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </Col>
      </div>

      <div className="grid row position-relative align-items-center mt-4 m px-5">
        <div className="col-12 col-md-7 w-md-90">
          <h1 className="landing-text mb-2">
            Stress free software License{" "}
            <span className="text-theme">Payments</span> and{" "}
            <span className="text-theme">Renewals </span>
          </h1>

          <div className="mt-5">
            <p style={{ lineHeight: "32px" }} className="w-70 w-md-90">
              Small businesses in Africa are having difficulties paying for
              invoiced software in foreign currencies due to central bank
              policies and forex regulations. Lifee Remit is collaborated with
              leading OEMs, software and SaaS providers to offer a convenient
              alternative for license payment and renewals in local currencies.
            </p>
          </div>
          <button className="btn btn_theme w-auto px-5 mt-2">Pay Now</button>
        </div>
        <div className="col-12 col-md-5 mt-3">
          <ProductCalculator />
        </div>
      </div>

      <div className="text-center mt-5 px-5">
        <h5 className="mb-5 fw-bold fs-4">Collaborators</h5>

        <Row className="px-5">
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center collaborators-logo"
          >
            <img
              src="https://download.logo.wine/logo/Sage_Group/Sage_Group-Logo.wine.png"
              alt=""
              width="116px"
              height="75px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center collaborators-logo"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2022/02/SAP-Symbol.png"
              alt=""
              width="116px"
              height="45px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center collaborators-logo"
          >
            <img
              src="https://pngimg.com/uploads/microsoft/microsoft_PNG20.png"
              alt=""
              width="200px"
              height="55px"
            />
          </Col>
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center collaborators-logo"
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2021/04/Oracle-logo.png"
              alt=""
              width="116px"
              height="75px"
            />
          </Col>
        </Row>
      </div>

      <div className="px-3 px-md-5 mt-5 h-100 d-flex bg-black p-5">
        <Row className="w-100 align-items-center">
          <Col md={5}>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(1)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 1}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Pay in Local Currency</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 1} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Paying for invoiced software in a foreign currency can be a
                  hassle, as you have to worry about exchange rates and
                  international fees. Lifee Remit eliminates this problem by
                  allowing you to pay in your local currency. This makes the
                  payment process much simpler and more straightforward.
                </div>
              </Collapse>
            </div>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(2)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 2}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Streamlined Renewal Process</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 2} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Lifee Remit is working with leading solution providers to make
                  software purchase and renewals less tedious. in few simple
                  steps your software gets renewed. Worry less about software
                  expiration, Lifee Remit has it covered.
                </div>
              </Collapse>
            </div>
            <div className="border-bottom">
              <button
                onClick={() => setSelected(3)}
                aria-controls="example-collapse-text"
                aria-expanded={selected === 3}
                className="border-0 w-100 bg-black"
              >
                <div className="d-flex align-items-center justify-content-between w-100 py-3">
                  <b className="text-white">Affordable Transaction Fees</b>

                  <i className="fa fa-angle-down text-theme fs-1"></i>
                </div>
              </button>
              <Collapse in={selected === 3} className="mb-3">
                <div
                  id="example-collapse-text"
                  className="text-white text-small"
                >
                  Unlike paying through a bank, where fees can start at $60
                  regardless of the transaction amount. Lifee Remit's rates and
                  transactions fees are affordable irrespective of the cost of
                  the software. Even if the software costs $20 or $5,000, rest
                  assured, you are guaranteed a competitive rate. (choose any
                  picture below that looks good)
                </div>
              </Collapse>
            </div>
          </Col>

          <Col md={7}>
            <img
              src={displayedImage}
              alt="img"
              className="w-100 rounded m-2 img-fluid"
            ></img>
          </Col>
        </Row>
      </div>

      <div className="bg-black text-white p-4">
        <h2>Testimonials</h2>
        <div className="text-center  fs-3 my-4">
          What our clients <br/>are saying
        </div>

        <div className="d-flex align-items-center x-scroll my-5 p-3">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="man"
            className="testimonial_img"
          ></img>
          <div className="mx-5">
            <b className="fs-2 mb-4">Kola</b>
            <p style={{ width: "360px" }} className="mt-4">
              It was easier than I thought, I made payment in Naira and that was
              it, couple minutes later my Sage Business Cloud account was
              active.
            </p>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="woman"
            className="testimonial_img"
          ></img>
          <div className="mx-5">
            <b className="fs-2 mb-4">Aisha</b>
            <p style={{ width: "360px" }} className="mt-4">
              I didn't need to call anyone or beg for my license key. I made
              payment and was kept up to date on the status of my license key
              from the OEM.
            </p>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="woman"
            className="testimonial_img"
          ></img>
          <div className="mx-5">
            <b className="fs-2 mb-4">David</b>
            <p style={{ width: "360px" }} className="mt-4">
              The charges are lower than the bank and the exchange rate is also
              good, compared to black market.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mx-2 my-5 d-flex align-items-center justify-content-center flex-column"
        id="faq"
      >
        <div className="w-75 w-md-90">
          <div className="faq-text">Frequently asked <br/>questions</div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What is Lifee Remit?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open} className="mb-3">
              <div id="example-collapse-text">
                As a digital distribution service, Lifee Remit makes it easy to
                pay for and renew software licences in your local currency. We
                accept Naira as payment for invoices issued in any foreign
                currency.
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen2(!open2)}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">How does it work?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open2} className="mb-3">
              <div id="example-collapse-text">
                It only takes a few easy steps. Choose the currency of your
                service provider's invoice, then choose OEM or service
                provider's product, fill out your information, and get the
                amount in Naira. Then you can pay. We will handle the rest and
                keep you updated at each stage until you receive your license or
                your account is activated.
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen3(!open3)}
              aria-controls="example-collapse-text"
              aria-expanded={open3}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What do I need to provide?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open3} className="mb-3">
              <div id="example-collapse-text">
                All you need is the Invoice, invoice number or unique identifier
                for your product or account. You can get this from your software
                or your service provider
              </div>
            </Collapse>
          </div>
          <div className="border-bottom">
            <button
              onClick={() => setOpen4(!open4)}
              aria-controls="example-collapse-text"
              aria-expanded={open4}
              className="border-0 w-100 body-bg"
            >
              <div className="d-flex align-items-center justify-content-between w-100 py-3">
                <b className="text-black">What is the transaction limit?</b>

                <i className="fa fa-angle-down text-theme fs-1"></i>
              </div>
            </button>
            <Collapse in={open4} className="mb-3">
              <div id="example-collapse-text">
                At this time, we are only able to process a maximum of $5,000
                per invoice transaction. Depending on the exchange rate that has
                been approved by the OEM or service provider, a Naira equivalent
                will be provided for your payment when you are ready to check
                out.
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <div style={{ height: "220px", backgroundColor: "#353535" }}>
        <Row className="h-100 position-relative">
          <div className="position-absolute w-100 text-white h-100">
            <div className="d-block d-md-flex align-items-center justify-content-between flex-row h-100 w-100 p-4">
              <div>
                <h2 className="w-100">Sign up to our newsletter</h2>
                <div style={{ opacity: 0.6 }} className="mb-3">
                  Sign up and get latest updates from Lifee Remit in your
                  mailbox
                </div>
              </div>

              <div style={{ zIndex: 9 }}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    className="form_inputs"
                    placeholder="Enter your email"
                    style={{
                      borderRadius: "10px 0px 0px 10px",
                      // minWidth: "200px",
                      width: "",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div
                    className="d-flex align-items-center px-4 cursor-pointer"
                    style={{
                      borderRadius: "0px 10px 10px 0px",
                      backgroundColor: "#9b62cd",
                    }}
                    onClick={signUpToNewsletter}
                  >
                    Sign Up
                  </div>
                </InputGroup>
              </div>
            </div>
          </div>
          <Col xs={4} className="newsletter"></Col>
          <Col xs={4} className="newsletter"></Col>
          <Col xs={4} className="newsletter"></Col>
        </Row>
      </div>

      <div className="bg-black text-white p-4 p-md-5">
        <Row className="mb-5 d-none d-md-flex">
          <Col md={5}>
            <div className="d-flex align-items-left justify-content-between flex-column h-100">
              <b>&copy; Lifeeremit</b>
              <a
                href="https://www.notion.so/Policies-05f03a421a0047658fb633ecbc5ec8cc"
                className="fw-bold no-underline text-white"
                target="_blank"
                rel="noreferrer"
              >
                Terms & Conditions
              </a>
            </div>
          </Col>
          <Col md={7}>
            <Row className="mb-4">
              <Col md={4}>
                <b
                  
                >
                  About
                </b>
              </Col>
              <Col md={4}>
                <b>Help</b>
              </Col>
              <Col md={4}>
                <b>Socials</b>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  Team
                </p>
              </Col>
              <Col md={4}>
                <p
                  className="faint-text text-small cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Contact us
                </p>
              </Col>
              <Col md={4}>
                <p className="faint-text text-small cursor-pointer">Twitter</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  Our Story
                </p>
              </Col>
              <Col md={4}>
                <a
                  href="#faq"
                  className="faint-text text-small no-underline text-white"
                >
                  FAQs
                </a>
              </Col>
              <Col md={4}>
                <a
                  className="faint-text text-small no-underline text-white"
                  href="https://www.linkedin.com/company/lifee-remit/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <p
                  className="faint-text text-small cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Careers
                </p>
              </Col>
              <Col md={4}>
                <a
                  className="faint-text text-small no-underline text-white"
                  href="https://www.linkedin.com/company/lifee-remit/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help
                </a>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Col>
        </Row>

        <div className="d-md-none mb-5">
          <b>&copy; Lifeeremit</b>
          <Row className="my-4">
            <Col xs={4}>
              <b>About</b>
            </Col>
            <Col xs={4}>
              <b>Help</b>
            </Col>
            <Col xs={4}>
              <b>Socials</b>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small"
                  onClick={() => navigate("/about")}>Team</p>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small"
                  onClick={() => navigate("/contact")}>Contact us</p>
            </Col>
            <Col xs={4}>
            <a
                  className="faint-text text-small no-underline text-white"
                  href="https://www.linkedin.com/company/lifee-remit/"
                  target="_blank"
                  rel="noreferrer"
                >LinkedIn</a>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small"
                  onClick={() => navigate("/about")}>Our Story</p>
            </Col>
            <Col xs={4}>
            <a
                  href="#faq"
                  className="faint-text text-small no-underline text-white"
                >FAQs</a>
            </Col>
            <Col xs={4}>
              <p className="faint-text text-small">Twitter</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <p className="faint-text text-small"
                  onClick={() => navigate("/contact")}>Careers</p>
            </Col>
            <Col xs={4}></Col>  
          </Row>
          
          <div className="text-center">
            <b>Terms & Conditions</b>
          </div>
        </div>
      </div>
    </div>
  );
};
