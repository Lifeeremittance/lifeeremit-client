import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ProgressBar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { getUserInfo } from "../../services/user";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Country: React.FC<Props> = () => {
  const [country, setCountry] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        sessionStorage.setItem("userId", res._id);
        sessionStorage.setItem("userEmail", res.email_address);
        sessionStorage.setItem("userFullName", res.fullName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const next = (e: any) => {
    e.preventDefault();
    if (!country) toast.error("Country cannot be empty");
    else navigate("/products/provider?country=" + country);
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className="bg-white border_right_country"
                >
                  🇳🇬{" "}
                  <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup>
              <div className="text-small my-2">
                This is the currency you are making payment in.
              </div>
              <button
                className="btn btn_theme fw-bold w-25 mt-4"
                onClick={next}
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
