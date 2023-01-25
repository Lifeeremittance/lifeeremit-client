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
import { getCountries } from "../../services/country";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Country: React.FC<Props> = () => {
  const [country, setCountry] = useState<string>("");
  const [countries, setCountries] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        sessionStorage.setItem("userId", res._id);
        sessionStorage.setItem("userEmail", res.email_address);
        sessionStorage.setItem("userFullName", res.fullName);
        sessionStorage.setItem("userPhone", res.phone_number);

        getCountries()
          .then((res) => {
            setCountries(res);
          })
          .catch((err) => {
            console.log(err);
          });
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

  const options = countries.map((country: any) => (
    <option key={country._id} value={country._id}>
      {country.countryName}
    </option>
  ));

  const countryFull = countries.find((c: any) => c._id === country);

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={20} />

            <h3 className="fw-bold my-5">Invoice Currency</h3>
            <Form>
              <InputGroup
                style={{ height: "54px", width: "394px" }}
                className="mt-2"
              >
                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-white border_left_country"
                >
                  <i className="fa fa-search fs-5"></i>
                </InputGroup.Text>
                <Form.Control
                  as="select"
                  aria-label="Currency"
                  aria-describedby="basic-addon1"
                  className="bg-white border_left_country fw-bold"
                  placeholder="Nigeria"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Currency</option>
                  {options}
                </Form.Control>
                <InputGroup.Text
                  id="basic-addon1"
                  className="border-start-0 border_right_country bg-white"
                >
                  <div className="d-flex align-items-center">
                    {country ? (
                      <>
                        <img
                          src={countryFull.countryFlag}
                          alt=""
                          width="36"
                          height="26"
                        />
                        <b className="mx-2">{countryFull.countryCode}</b>
                        <svg
                          width="16"
                          height="10"
                          viewBox="0 0 16 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.1039 0.430608C14.8277 0.154806 14.4541 0 14.0647 0C13.6752 0 13.3016 0.154806 13.0254 0.430608L7.73314 5.67267L2.51462 0.430608C2.23842 0.154806 1.86479 0 1.47534 0C1.08588 0 0.712256 0.154806 0.436054 0.430608C0.297883 0.568268 0.188214 0.732047 0.113373 0.912497C0.0385316 1.09295 0 1.2865 0 1.48198C0 1.67747 0.0385316 1.87102 0.113373 2.05147C0.188214 2.23192 0.297883 2.39569 0.436054 2.53335L6.68649 8.81198C6.82353 8.95077 6.98658 9.06094 7.16622 9.13612C7.34586 9.21129 7.53854 9.25 7.73314 9.25C7.92775 9.25 8.12043 9.21129 8.30007 9.13612C8.47971 9.06094 8.64276 8.95077 8.7798 8.81198L15.1039 2.53335C15.2421 2.39569 15.3518 2.23192 15.4266 2.05147C15.5015 1.87102 15.54 1.67747 15.54 1.48198C15.54 1.2865 15.5015 1.09295 15.4266 0.912497C15.3518 0.732047 15.2421 0.568268 15.1039 0.430608Z"
                            fill="black"
                          />
                        </svg>
                      </>
                    ) : null}
                  </div>
                </InputGroup.Text>
              </InputGroup>
              <div className="text-small my-2">
                This is the currency of your invoice from the service provider.
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
