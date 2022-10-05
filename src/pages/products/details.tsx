import React, { useState } from "react";
import { Container, Col, Row, ProgressBar, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { createOrder } from "../../services/order";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Details: React.FC<Props> = () => {
  const [invoice, setInvoice] = useState<any>({
    preview: "",
    raw: null,
  });
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [reason, setReason] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const navigate = useNavigate();

  const search = useLocation().search;
  const country: any = new URLSearchParams(search).get("country");
  const provider: any = new URLSearchParams(search).get("provider");
  const product: any = new URLSearchParams(search).get("product");

  const firebaseConfig = {
    // ...
    storageBucket: "gs://lifeeremit-e7281.appspot.com",
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setInvoice({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const triggerFileInput = () => {
    const hold = document?.getElementById("upload-button");
    hold?.click();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const storageRef = ref(storage, invoice.preview);
    const uploadTask = uploadBytesResumable(storageRef, invoice.raw);
    await uploadTask;
    const pdfUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const response = await createOrder(
      provider,
      product,
      country,
      companyName,
      companyAddress,
      contactName,
      phoneNumber,
      email,
      reason,
      parseInt(referenceNumber),
      parseInt(invoiceNumber),
      pdfUrl
    );
    console.log(response);
    if (response.status === 201) {
      toast.success("Order created successfully");
      navigate("/products/payment/" + response.data.data._id);
    } else {
      toast.error(response);
    }
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={9} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <ProgressBar now={80} />
            <div
              className="d-flex align-items-center mt-3"
              onClick={() => navigate(-1)}
            >
              <i className="fa fa-angle-left fs-4 me-2" aria-hidden="true"></i>
              <span className="fs-6">Back</span>
            </div>

            <h3 className="fw-bold my-4">Kindly fill</h3>

            <Form>
              <Form.Group controlId="formForPayment">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  className="form_inputs mb-3 w-100"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <Form.Label>
                  Company Address <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Company Address"
                  className="form_inputs mb-3 w-100"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
                <Form.Label>
                  Contact Name <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a contact name"
                  className="form_inputs mb-3 w-100"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                <Row>
                  <Col md={6}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      className="form_inputs mb-3 w-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      defaultCountry="NG"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      withCountryCallingCode
                      international
                      countryCallingCodeEditable={false}
                      initialValueFormat="national"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      className="ps-3 py-3 mb-3 form_inputs w-100"
                      // error={
                      //   phoneNumber
                      //     ? isPossiblePhoneNumber(phoneNumber)
                      //       ? undefined
                      //       : "Invalid phone number"
                      //     : "Phone number required"
                      // }
                    />
                  </Col>
                </Row>
                <Form.Label>
                  Reason For Payment
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter reason for payment"
                  className="form_inputs mb-3 w-100 h-auto"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <Form.Label>
                  Reference Number
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1234567890"
                  className="form_inputs mb-3 w-100"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
                <Form.Label>
                  Invoice Number
                  <span className="text-small">(Optional)</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Invoice Number"
                  className="form_inputs mb-5 w-100"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                <div className="d-flex align-items-center justify-content-center to_upload cursor-pointer">
                  {invoice.preview === "" ? (
                    <span
                      className="d-flex flex-column align-items-center"
                      onClick={triggerFileInput}
                    >
                      <svg
                        width="50"
                        height="34"
                        viewBox="0 0 50 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.3125 12.5833C38.8958 5.39583 32.5833 0 25 0C18.9792 0 13.75 3.41667 11.1458 8.41667C4.875 9.08333 0 14.3958 0 20.8333C0 27.7292 5.60417 33.3333 12.5 33.3333H39.5833C45.3333 33.3333 50 28.6667 50 22.9167C50 17.4167 45.7292 12.9583 40.3125 12.5833ZM39.5833 29.1667H12.5C7.89583 29.1667 4.16667 25.4375 4.16667 20.8333C4.16667 16.5625 7.35417 13 11.5833 12.5625L13.8125 12.3333L14.8542 10.3542C16.8333 6.54167 20.7083 4.16667 25 4.16667C30.4583 4.16667 35.1667 8.04167 36.2292 13.3958L36.8542 16.5208L40.0417 16.75C43.2917 16.9583 45.8333 19.6875 45.8333 22.9167C45.8333 26.3542 43.0208 29.1667 39.5833 29.1667ZM16.6667 18.75H21.9792V25H28.0208V18.75H33.3333L25 10.4167L16.6667 18.75Z"
                          fill="#C7C7CC"
                        />
                      </svg>
                      <span className="text-small">Upload Invoice</span>
                    </span>
                  ) : (
                    <embed
                      src={invoice.preview}
                      type="application/pdf"
                      height="100%"
                      width="100%"
                      onClick={triggerFileInput}
                    ></embed>
                  )}
                </div>
                <input
                  type="file"
                  id="upload-button"
                  className="d-none"
                  accept=".pdf"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>

            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn btn_theme fw-bold w-auto px-5 fs-5"
                onClick={handleSubmit}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
