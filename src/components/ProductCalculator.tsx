import { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import logoImage from "../assets/img/logo.png";
import { getCountries } from "../services/country";
import { getProducts } from "../services/products";
import { getCurrencies } from "../services/currency";
import { getRates } from "../services/rates";
import { getCharges } from "../services/charges";
import { getProviders } from "../services/providers";
import ngImage from "../assets/img/NG.png";

export const ProductCalculator = () => {
  const navigate = useNavigate();
  
  const [country, setCountry] = useState<string>("");
  const [currency, setCurrency] = useState<any>("");
  const [countries, setCountries] = useState<any>([]);

  const [selected, setSelected] = useState("");
  const [providers, setProviders] = useState([]);

  const [productSelected, setProductSelected] = useState("");
  const [products, setProducts] = useState([]);

  const [amount, setAmount] = useState<any>(0);
  const [charges, setCharges] = useState<any>([]);

  const [currencyRate, setCurrencyRate] = useState<any>("");
  const [countryRate, setCountryRate] = useState<any>("");
  const [rateValue, setRateValue] = useState<any>("");
  //   const search = useLocation().search;
  //   const provider: any = new URLSearchParams(search).get("provider");
  // const provider = selected;

  useEffect(() => {
    getCurrencies()
      .then((currencyRes) => {
        currencyRes.forEach((item: any) => {
          if (item.currencyName === "Nigeria") {
            setCurrency(item._id);
            return;
          }
        });

        getCountries()
          .then((res) => {
            setCountries(res);

            getProviders()
              .then((res) => {
                setProviders(res);

                getCharges()
                  .then((chargesRes) => {
                    setCharges(chargesRes[0]);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selected) {
      getProducts(selected)
        .then((res) => {
          setProducts(res);

          if (country && currency)
            getRates(selected, country, currency)
              .then((res) => {
                setCountryRate(res[0].country.countryCode);
                setRateValue(res[0].value);
                setCurrencyRate(res[0].currency.currencyCode);
              })
              .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [selected, country, currency]);

  // console.log(charges.productInterest, amount, rateValue);

  const options = countries.map((country: any) => (
    <option key={country._id} value={country._id}>
      {country.countryName}
    </option>
  ));
  const countryFull = countries.find((c: any) => c._id === country);

  return (
    <div>
      <div className="bg-white shadow rounded px-4 py-2">
        <img src={logoImage} alt="logo" width="115" />

        <h6 className="fw-semibold mt-2">Select Currency</h6>
        <Form>
          <InputGroup style={{ height: "34px", width: "80%" }} className="mt-2">
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
          {/* <div className="text-small my-2">
                This is the currency of your invoice from the service provider.
              </div> */}

          <h6 className="fw-semibold mt-5">Select Service Provider</h6>

          <div className="grid-4">
            {providers.length > 0
              ? providers.map((provider: any, index: any) => (
                  <div
                    className={`grid-item landing-providers d-flex align-items-center justify-content-center cursor-pointer ${
                      selected === provider._id ? "provider-selected" : ""
                    }`}
                    id={provider._id}
                    onClick={() => setSelected(provider._id)}
                    key={index}
                  >
                    <img src={provider.logo} alt="" width="35px" />
                  </div>
                ))
              : null}
          </div>

          <h6 className="fw-semibold mt-5">Choose Product</h6>

          {products.length > 0
            ? products.map((product: any, index: any) => (
                <div
                  className={`mb-2 w-75 check_radio cursor-pointer px-4 py-2 text-small ${
                    productSelected === product._id ? "selected_radio" : ""
                  }`}
                  key={index}
                  onClick={() => setProductSelected(product._id)}
                >
                  {product.name}
                </div>
              ))
            : "There are no products for this provider"}

          {currencyRate ? (
            <div className="d-flex align-items-center justify-content-center my-5">
              <span className="rate_box p-3 fw-bold">
                <span>Rate:</span>{" "}
                <span className="text-theme">
                  {`1${countryRate} = ${rateValue}
                  ${currencyRate}`}
                </span>
              </span>
            </div>
          ) : (
            <p>no rates</p>
          )}

          <Form>
            <Form.Group controlId="formForPaystack">
              <div>
                <Form.Text className="fw-bold fs-6 text-dark">
                  Product Amount
                </Form.Text>
              </div>
              <Form.Text>In the currency of your invoice</Form.Text>
              <InputGroup
                style={{ height: "34px", width: "294px" }}
                className="mt-2"
              >
                <Form.Control
                  type="number"
                  aria-label="Amount"
                  aria-describedby="basic-addon1"
                  className="bg-white border_left_country fw-bold"
                  // placeholder="Nigeria"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <InputGroup.Text
                  id="basic-addon1"
                  className="border-start-0 border_right_country bg-white"
                >
                  <div className="d-flex align-items-center">
                    <>
                      {country && (
                        <div className="d-flex align-items-center">
                          <img
                            src={countryFull.countryFlag}
                            alt=""
                            width="36"
                            height="26"
                          />
                          <b className="mx-2">{countryFull.countryCode}</b>
                        </div>
                      )}
                    </>
                  </div>
                </InputGroup.Text>
              </InputGroup>
              <div>
                <svg
                  width="1"
                  height="20"
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
                  <b className="text-small">
                    ${charges.serviceCharge} (NGN{" "}
                    {charges.serviceCharge * charges.dollarRate} )
                  </b>
                </div>
              </div>
              <div>
                <svg
                  width="1"
                  height="20"
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
                  <b className="text-small">
                    {charges.productInterest}% = 1 {currencyRate} (NGN{" "}
                    {((charges.productInterest * amount) / 100) * rateValue})
                  </b>
                </div>
              </div>
              <div>
                <svg
                  width="1"
                  height="20"
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
                    Software cost in Naira:
                  </span>
                  <b className="text-small">₦{amount * rateValue}</b>
                </div>
              </div>
              <div>
                <svg
                  width="1"
                  height="20"
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
                style={{ height: "34px", width: "294px" }}
                className="mb-2"
              >
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  className="bg-white border_left_country fw-bold w-50"
                  value={
                    (amount * rateValue || 0) +
                    charges.dollarRate * parseInt(charges.serviceCharge) +
                    ((charges.productInterest * (amount || 0)) / 100) *
                      rateValue
                  }
                  disabled
                />
                <InputGroup.Text
                  id="basic-addon1"
                  className="border-start-0 border_right_country bg-white"
                >
                  <div className="d-flex align-items-center">
                    <img src={ngImage} alt="" width="36" height="26" />
                    <b className="mx-2">NGN</b>
                  </div>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Text className="fw-bold fs-6 text-dark">
              Amount to Pay
            </Form.Text>
          </Form>
          <div className="mt-5">
            <button
              className="btn btn_theme fw-bold w-50 fs-6"
              onClick={() => navigate("Signup")}
            >
              Pay
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
