import React, { useState } from "react";
import { Container, Col, Row, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Provider: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

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
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === 1 ? "selected" : ""
                }`}
                id="1"
                onClick={() => setSelected(1)}
              >
                <img
                  src="https://download.logo.wine/logo/Sage_Group/Sage_Group-Logo.wine.png"
                  alt=""
                  width="116px"
                  height="75px"
                />
              </div>
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === 2 ? "selected" : ""
                }`}
                id="2"
                onClick={() => setSelected(2)}
              >
                <img
                  src="https://logos-world.net/wp-content/uploads/2022/02/SAP-Symbol.png"
                  alt=""
                  width="116px"
                  height="45px"
                />
              </div>
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === 3 ? "selected" : ""
                }`}
                id="3"
                onClick={() => setSelected(3)}
              >
                <img
                  src="https://cdn.vox-cdn.com/thumbor/VSSwGPlTwiV0AY5zL9Afu7KGpno=/0x28:640x388/1600x900/cdn.vox-cdn.com/assets/1311169/mslogo.jpg"
                  alt=""
                  width="136px"
                  height="85px"
                />
              </div>
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === 4 ? "selected" : ""
                }`}
                id="4"
                onClick={() => setSelected(4)}
              >
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Oracle-logo.png"
                  alt=""
                  width="116px"
                  height="75px"
                />
              </div>
              <div
                className={`grid-item providers_list d-flex align-items-center justify-content-center cursor-pointer ${
                  selected === 5 ? "selected" : ""
                }`}
                id="5"
                onClick={() => setSelected(5)}
              >
                <b>OTHERS</b>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={() => navigate("/products/product")}
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
