import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Main(props) {
  return (
    <div>
      <Navbar>
        <Container fluid>
          <Navbar.Brand href="#search">
            <h3>HospitalFinder</h3>
          </Navbar.Brand>
            <Navbar.Text>
              Signed in as: <a href="/login">Ahmed</a>
            </Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
}

export default Main;
