import React from "react";
import Sidebar from "../template/sidebar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Main from "../template/main";

function UpdateHospital() {
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
            <Form className="my-5">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="+XX XXX XXX XXX" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
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
