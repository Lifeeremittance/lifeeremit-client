import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  ProgressBar,
} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Product: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={60} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Select Product</h3>

            <div
              key="radio"
              className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                selected === 1 ? "selected_radio" : ""
              }`}
              onClick={() => setSelected(1)}
            >
              Sage business cloud
            </div>

            <div
              key="radio"
              className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                selected === 2 ? "selected_radio" : ""
              }`}
              onClick={() => setSelected(2)}
            >
              Sage business cloud
            </div>

            <div
              key="radio"
              className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                selected === 3 ? "selected_radio" : ""
              }`}
              onClick={() => setSelected(3)}
            >
              Sage business cloud
            </div>

            <div
              key="radio"
              className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                selected === 4 ? "selected_radio" : ""
              }`}
              onClick={() => setSelected(4)}
            >
              Sage business cloud
            </div>

            <div
              key="radio"
              className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                selected === 5 ? "selected_radio" : ""
              }`}
              onClick={() => setSelected(5)}
            >
              Sage business cloud
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={() => navigate("/products/details")}
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
