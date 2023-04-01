import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { getUserInfo, updateUser } from "../../services/user";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const Edit: React.FC<Props> = () => {
  // const [user, setUser] = useState<any>({});
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        // setUser(res);
        setFullName(res.fullName);
        setEmail(res.email_address);
        setPhone(res.phone_number);
        setAddress(res.address);
        setCompanyName(res.companyName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      fullName,
      email_address: email,
      phone_number: phone,
      address,
      companyName,
    };
    try {
      const res = await updateUser(sessionStorage.getItem("userId"), data);
      console.log(res);
      if (res.status === 200) toast.success(res.data.data);
      else toast.error(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="vw-100 vh-100">
      <Row className="p-0">
        <Sidebar />
        <Col md={8} lg={10} className="p-0 body-bg">
          <Header />

          <div className="bg-white vh-85 border-top-left-radius py-5 y-scroll">
            <div className="media-upload d-flex align-items-center justify-content-center mb-4">
              <svg
                width="32"
                height="40"
                viewBox="0 0 32 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8756 26.8038C14.6349 26.5814 17.407 26.5814 20.1664 26.8038C21.669 26.8914 23.1645 27.0794 24.6434 27.3665C27.8436 28.0145 29.9329 29.0717 30.8283 30.777C31.5008 32.1078 31.5008 33.6921 30.8283 35.023C29.9329 36.7282 27.9265 37.8536 24.6102 38.4334C23.1325 38.7314 21.6366 38.9251 20.1332 39.0132C18.7403 39.1666 17.3475 39.1666 15.9381 39.1666H13.4011C12.8705 39.0984 12.3564 39.0643 11.859 39.0643C10.3555 38.987 8.85932 38.7989 7.38196 38.5016C4.18172 37.8877 2.09244 36.7964 1.19704 35.0912C0.851379 34.4306 0.669148 33.6927 0.666215 32.9426C0.659222 32.1879 0.835942 31.4434 1.18046 30.777C2.05928 29.0717 4.14856 27.9634 7.38196 27.3665C8.86583 27.0753 10.3671 26.8873 11.8756 26.8038ZM16.0044 0.833313C21.5631 0.833313 26.0694 5.46747 26.0694 11.184C26.0694 16.9005 21.5631 21.5347 16.0044 21.5347C10.4456 21.5347 5.93937 16.9005 5.93937 11.184C5.93937 5.46747 10.4456 0.833313 16.0044 0.833313Z"
                  fill="white"
                />
              </svg>
            </div>

            <Form>
              <Form.Group controlId="formForProfile">
                <div className="grid-2">
                  <div>
                    <Form.Label className="fw-bold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g John Daniel"
                      className="form_inputs w-100"
                      value={fullName}
                      // defaultValue={user.fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g Business Name Plc"
                      className="form_inputs w-100"
                      // defaultValue={user.companyName}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g johndaniel@gmail.com"
                      className="form_inputs w-100"
                      // defaultValue={user.email_address}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g 08139932932"
                      className="form_inputs w-100"
                      // defaultValue={user.phone_number}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="fw-bold">Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g Ikoyi, Lagos"
                      className="form_inputs w-100"
                      // defaultValue={user.address}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            </Form>
            <button
              className="btn btn_theme mt-4 w-auto px-5"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
