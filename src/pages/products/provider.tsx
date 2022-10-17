import React, { useState, useEffect } from "react";
import { Container, Col, Row, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { getProviders } from "../../services/providers";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Provider: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProviders()
      .then((res) => {
        setProviders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const search = useLocation().search;
  const country: any = new URLSearchParams(search).get("country");

  const next = (e: any) => {
    e.preventDefault();
    if (!selected) toast.error("Please select a provider");
    else
      navigate(
        "/products/product?country=" + country + "&provider=" + selected
      );
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

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
              {providers.length > 0
                ? providers.map((provider: any, index: any) => (
                    <div
                      className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                        selected === provider._id ? "selected" : ""
                      }`}
                      id={provider._id}
                      onClick={() => setSelected(provider._id)}
                      key={index}
                    >
                      <img
                        src={provider.logo}
                        alt=""
                        width="80%"
                        height="40px"
                      />
                    </div>
                  ))
                : null}
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === "others" ? "selected" : ""
                }`}
                onClick={() => setSelected("others")}
              >
                <b>OTHERS</b>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={next}
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
