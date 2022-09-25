import React from "react";
import {
  Container,
  Col,
  Row,
  ProgressBar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Country: React.FC<Props> = () => {
  const navigate = useNavigate();

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
                />
                <InputGroup.Text
                  id="basic-addon2"
                  className="bg-white border_right_country"
                >
                  🇳🇬{" "}
                  <i className="fa fa-caret-down ms-1" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup>
              <div className="text-small">
                This is the currency you are making payment in.
              </div>
              <button
                className="btn btn_theme fw-bold w-25 mt-4"
                onClick={() => navigate("/products/provider")}
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
