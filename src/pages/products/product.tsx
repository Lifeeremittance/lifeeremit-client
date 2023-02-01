import React, { useState, useEffect } from "react";
import { Container, Col, Row, ProgressBar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { getProducts } from "../../services/products";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Product: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [products, setProducts] = useState([]);

  const search = useLocation().search;
  const country: any = new URLSearchParams(search).get("country");
  const provider: any = new URLSearchParams(search).get("provider");

  useEffect(() => {
    getProducts(provider)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [provider]);

  const next = (e: any) => {
    e.preventDefault();
    if (!selected) toast.error("Please select a provider");
    else
      navigate(
        "/products/details?country=" +
          country +
          "&provider=" +
          provider +
          "&product=" +
          selected
      );
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={10} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={60} />
            <div
              className="d-flex align-items-center mt-3 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Select Product</h3>

            {products.length > 0
              ? products.map((product: any, index: any) => (
                  <div
                    className={`mb-3 check_radio cursor-pointer px-4 py-3 ${
                      selected === product._id ? "selected_radio" : ""
                    }`}
                    key={index}
                    onClick={() => setSelected(product._id)}
                  >
                    {product.name}
                  </div>
                ))
              : "There are no products for this provider"}

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
