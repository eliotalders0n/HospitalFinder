import React, { useState, useEffect } from "react";

import firebaseConfig from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Sidebar from "../template/sidebar";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Main from "../template/main";

firebase.initializeApp(firebaseConfig);
const collectionPath = "hospitals";

function UpdateHospital() {
  const [updated, setUpdated] = useState(false);
  const { id } = useParams();
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    logo: "",
  });

  useEffect(() => {
    // Get Firestore data for the specified hospital
    const list = firebase
      .firestore()
      .collection(collectionPath)
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setHospital(data);
      });

    return () => list();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospital((prevHospital) => ({ ...prevHospital, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update Firestore data for the specified hospital
    firebase
      .firestore()
      .collection(collectionPath)
      .doc(id)
      .update(hospital)
      .then(() => {
        console.log("hospital updated successfully");
        setUpdated(true);
      })
      .catch((error) => {
        console.error("Error updating hospital:", error);
      });
  };

  if(updated){
    return <Navigate to="/hospitals" />; // navigate to dashboard
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Update Hospital</h2>
            <Form className="my-5" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="name"
                    value={hospital.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={hospital.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  placeholder="+XX XXX XXX XXX"
                  name="name"
                  value={hospital.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  name="name"
                  value={hospital.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="name"
                    value={hospital.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    //
                    // name="name"
                    // value={hospital.state}
                    // onChange={handleChange}
                  >
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="name"
                    value={hospital.zip}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select Hospital Logo</Form.Label>
                <Form.Control type="file" />
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

export default UpdateHospital;
