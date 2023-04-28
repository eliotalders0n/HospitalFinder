import React, { useState, useEffect } from "react";

import firebaseConfig from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Sidebar from "../template/sidebar";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Main from "../template/main";

firebase.initializeApp(firebaseConfig);
const collectionPath = "users";

function UpdateUsers() {
  const [updated, setUpdated] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    // Get Firestore data for the specified user
    const list = firebase
      .firestore()
      .collection(collectionPath)
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setUser(data);
      });

    return () => list();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update Firestore data for the specified user
    firebase
      .firestore()
      .collection(collectionPath)
      .doc(id)
      .update(user)
      .then(() => {
        console.log("User updated successfully");
        setUpdated(true);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  if (updated) {
    return <Navigate to="/users" />; // navigate to dashboard
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
            <h2 className="text-muted my-5">Update User</h2>
            <Form className="my-5" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter role"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    name="state"
                    value={user.state}
                  >
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter zip"
                    name="zip"
                    value={user.zip}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

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

export default UpdateUsers;
