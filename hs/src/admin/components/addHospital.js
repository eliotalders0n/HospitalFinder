import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Sidebar from "../template/sidebar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Main from "../template/main";

firebase.initializeApp(firebaseConfig);

function AddHospital() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const itemsRef = firebase.firestore().collection("hospitals");
    try {
      await itemsRef.add({
        name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        logo,
      });
      console.log("Hospital added successfully!");
      <Navigate to="/hospitals" />;
    } catch (error) {
      console.error("Error adding hospital: ", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Add Hospital</h2>
            <Form className="my-5" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  placeholder="+XX XXX XXX XXX"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={(event) => setState(event.target.value)} >
                    <option>Choose...</option>
                    <option value={state}>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Hospital Logo</Form.Label>
                <Form.Control
                  type="file"
                  value={logo}
                  onChange={(event) => setLogo(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default AddHospital;
