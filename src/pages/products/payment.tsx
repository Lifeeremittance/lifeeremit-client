import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ProgressBar,
  Form,
  Modal,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { getCurrencies } from "../../services/currency";
import { getOrderById } from "../../services/order";
import { getRates } from "../../services/rates";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Payment: React.FC<Props> = () => {
  const [successful, setSuccessful] = useState(false);
  const [unsuccessful, setUnsuccessful] = useState(false);
  const [amount, setAmount] = useState<any>(0);
  const [currency, setCurrency] = useState<any>("");

  const [currencies, setCurrencies] = useState<any>([]);
  const [order, setOrder] = useState<any>({});

  const [currencyRate, setCurrencyRate] = useState<any>("");
  const [countryRate, setCountryRate] = useState<any>("");
  const [rateValue, setRateValue] = useState<any>("");

  const { id } = useParams();

  useEffect(() => {
    getCurrencies()
      .then((res) => {
        setCurrencies(res);

        getOrderById(id)
          .then((res) => {
            setOrder(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const navigate = useNavigate();

  console.log(typeof rateValue);

  const paystack = () => {
    let handler = PaystackPop.setup({
      key: process.env["REACT_APP_PAYSTACK_PUBLIC_KEY"],
      email: sessionStorage.getItem("userEmail"),
      amount: ((amount || 0) + 710 * 10) * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        orderId: id,
        product_value: amount * 100,
        currency,
        rate: rateValue,
      },
      label: sessionStorage.getItem("userFullName"),
      onClose: () => {
        console.log("Window closed.");
      },
      callback: (response: { reference: string }) => {
        let message = "Payment complete! Reference: " + response.reference;
        console.log(message);
        setSuccessful(true);
      },
    });

    handler.openIframe();
  };

  const options = currencies.map((currency: any) => (
    <option key={currency._id} value={currency._id}>
      {currency.currencyName}
    </option>
  ));

  const currencyFull = currencies.find((c: any) => c._id === currency);

  const handleChange = (value: string) => {
    setCurrency(value);
    getRates(order.provider._id, order.country._id, value)
      .then((res) => {
        setCountryRate(res[0].country.countryCode);
        setCurrencyRate(res[0].currency.currencyCode);
        setRateValue(res[0].value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={100} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Enter Amount</h3>

            {currencyRate ? (
              <div className="d-flex align-items-center justify-content-center mb-5">
                <span className="rate_box p-3 fw-bold">
                  <span>Rate:</span>{" "}
                  <span className="text-theme">
                    {`1${currencyRate} = ${rateValue}
                  ${countryRate}`}
                  </span>
                </span>
              </div>
            ) : null}

            <Form>
              <Form.Group controlId="formForPaystack">
                <div>
                  <Form.Text className="fw-bold fs-6 text-dark">
                    Product Amount
                  </Form.Text>
                </div>
                <Form.Text>The currency of your invoice</Form.Text>
                <InputGroup
                  style={{ height: "54px", width: "394px" }}
                  className="mt-2"
                >
                  <Form.Control
                    as="select"
                    aria-label="Currency"
                    aria-describedby="basic-addon1"
                    className="bg-white border_left_country fw-bold"
                    placeholder="Nigeria"
                    value={currency}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <option value="">Select Currency</option>
                    {options}
                  </Form.Control>
                  <InputGroup.Text
                    id="basic-addon1"
                    className="border-start-0 border_right_country bg-white"
                  >
                    <div className="d-flex align-items-center">
                      {currency ? (
                        <>
                          <img
                            src={currencyFull.currencyImage}
                            alt=""
                            width="36"
                            height="26"
                          />
                          <b className="mx-2">{currencyFull.currencyCode}</b>
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
                <div>
                  <svg
                    width="1"
                    height="50"
                    viewBox="0 0 1 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "4rem" }}
                  >
                    <line
                      x1="0.5"
                      y1="2.18556e-08"
                      x2="0.499998"
                      y2="50"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                </div>
                <div className="d-flex align-items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "calc(4rem - 10px)" }}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9.5"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                  <div className="ms-3 d-flex align-items-center">
                    <span className="text-muted text-small me-2">
                      service charge:
                    </span>
                    <b>$10</b>
                  </div>
                </div>
                <div>
                  <svg
                    width="1"
                    height="50"
                    viewBox="0 0 1 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "4rem" }}
                  >
                    <line
                      x1="0.5"
                      y1="2.18556e-08"
                      x2="0.499998"
                      y2="50"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                </div>
                <div className="d-flex align-items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "calc(4rem - 10px)" }}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9.5"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                  <div className="ms-3 d-flex align-items-center">
                    <span className="text-muted text-small me-2">
                      Product Interest:
                    </span>
                    <b>1% = 2 USD</b>
                  </div>
                </div>
                <div>
                  <svg
                    width="1"
                    height="50"
                    viewBox="0 0 1 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "4rem" }}
                  >
                    <line
                      x1="0.5"
                      y1="2.18556e-08"
                      x2="0.499998"
                      y2="50"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                </div>
                <div className="d-flex align-items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "calc(4rem - 10px)" }}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9.5"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                  <div className="ms-3 d-flex align-items-center">
                    <span className="text-muted text-small me-2">
                      Total Amount in Naira:
                    </span>
                    <b>#{(amount || 0) + 710 * 10}</b>
                  </div>
                </div>
                <div>
                  <svg
                    width="1"
                    height="50"
                    viewBox="0 0 1 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "4rem" }}
                  >
                    <line
                      x1="0.5"
                      y1="2.18556e-08"
                      x2="0.499998"
                      y2="50"
                      stroke="#263238"
                      strokeOpacity="0.39"
                    />
                  </svg>
                </div>
                <InputGroup
                  style={{ height: "54px", width: "394px" }}
                  className="mb-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    className="bg-white border_left_country fw-bold w-50"
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                  <InputGroup.Text
                    id="basic-addon1"
                    className="border-start-0 border_right_country bg-white"
                  >
                    <div className="d-flex align-items-center">
                      {currency ? (
                        <>
                          <img
                            src={order.country.countryFlag}
                            alt=""
                            width="36"
                            height="26"
                          />
                          <b className="mx-2">{order.country.countryCode}</b>
                        </>
                      ) : null}
                    </div>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Text className="fw-bold fs-6 text-dark">
                Amount to Pay
              </Form.Text>
            </Form>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-25 fs-5"
                onClick={paystack}
              >
                Pay
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        show={successful}
        onHide={() => setSuccessful(false)}
        backdrop="static"
        centered
      >
        <Card className="bg-white border-0">
          <Card.Body className="d-flex align-items-center flex-column">
            <svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-5 mb-3"
            >
              <path
                d="M49 0C39.3087 0 29.8351 2.8738 21.7771 8.25799C13.7191 13.6422 7.43862 21.2949 3.72992 30.2485C0.0212308 39.2021 -0.949132 49.0543 0.941543 58.5594C2.83222 68.0645 7.49902 76.7954 14.3518 83.6482C21.2046 90.501 29.9355 95.1678 39.4406 97.0585C48.9457 98.9491 58.7979 97.9788 67.7515 94.2701C76.7051 90.5614 84.3578 84.2809 89.742 76.2229C95.1262 68.1649 98 58.6913 98 49C98 36.0044 92.8375 23.541 83.6482 14.3518C74.459 5.16248 61.9956 0 49 0ZM81.0031 32.5544L40.7619 72.765L16.9969 49C16.1847 48.1878 15.7284 47.0862 15.7284 45.9375C15.7284 44.7888 16.1847 43.6872 16.9969 42.875C17.8091 42.0628 18.9107 41.6065 20.0594 41.6065C21.2081 41.6065 22.3097 42.0628 23.1219 42.875L40.8231 60.5762L74.9394 26.4906C75.3416 26.0884 75.819 25.7694 76.3445 25.5518C76.8699 25.3341 77.4331 25.2221 78.0019 25.2221C78.5706 25.2221 79.1338 25.3341 79.6593 25.5518C80.1848 25.7694 80.6622 26.0884 81.0644 26.4906C81.4666 26.8928 81.7856 27.3702 82.0032 27.8957C82.2209 28.4212 82.3329 28.9844 82.3329 29.5531C82.3329 30.1219 82.2209 30.6851 82.0032 31.2105C81.7856 31.736 81.4666 32.2134 81.0644 32.6156L81.0031 32.5544Z"
                fill="#72C487"
              />
            </svg>
            <b className="fs-5 mb-5">Payment Successful</b>
            <button
              className="btn btn_theme fw-bold w-50 px-5 fs-5 mt-4 mb-3"
              onClick={() => setSuccessful(false)}
            >
              Okay
            </button>
          </Card.Body>
        </Card>
      </Modal>
      <Modal
        show={unsuccessful}
        onHide={() => setUnsuccessful(false)}
        backdrop="static"
        centered
      >
        <Card className="bg-white border-0">
          <Card.Body className="d-flex align-items-center flex-column">
            <svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49 98C76.2222 98 98 76.2222 98 49C98 21.7778 76.2222 0 49 0C21.7778 0 0 21.7778 0 49C0 76.2222 21.7778 98 49 98ZM49 10.8889C70.2333 10.8889 87.1111 27.7667 87.1111 49C87.1111 70.2333 70.2333 87.1111 49 87.1111C27.7667 87.1111 10.8889 70.2333 10.8889 49C10.8889 27.7667 27.7667 10.8889 49 10.8889Z"
                fill="#FF0000"
              />
            </svg>

            <b className="fs-5 mb-5">Payment Failed</b>
            <button
              className="btn btn_theme fw-bold w-50 px-5 fs-5 mt-4 mb-3"
              onClick={() => setUnsuccessful(false)}
            >
              Okay
            </button>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
};
