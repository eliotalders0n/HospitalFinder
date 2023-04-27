import React from "react";
import { Container, Col, Navbar, Nav } from "react-bootstrap";

function Head(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container
        className="text-center"
        style={{ backgroundColor: "white", padding: "2vh" }}
      >
        <Navbar.Brand href="/" className="mx-auto">
          <h1>
            Hospital<span style={{ color: "purple" }}>Finder</span>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Col md={2}>
            <Nav.Link
              href="search"
              style={{ fontSize: "2vh", paddingTop: "1vh" }}
            >
              Search
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="advertise"
              style={{ fontSize: "2vh", paddingTop: "1vh" }}
            >
              Advertise
            </Nav.Link>
          </Col>
          {/* <Col md={4}>
            <h1>
              Hospital<span style={{ color: "purple" }}>Finder</span>
            </h1>
          </Col> */}
          <Col md={2}>
            <Nav.Link
              href="help"
              style={{ fontSize: "2vh", paddingTop: "1vh" }}
            >
              Help
            </Nav.Link>
          </Col>
          <Col md={2}>
            <Nav.Link
              href="about"
              style={{ fontSize: "2vh", paddingTop: "1vh" }}
            >
              About
            </Nav.Link>
          </Col>
        </Navbar.Collapse>
      </Container>
      <hr />
    </Navbar>
  );
}

export default Head;
