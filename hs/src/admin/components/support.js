import React from "react";
import Sidebar from "../template/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import Main from "../template/main";

function Support(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Support</h2>
            <div
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/advanced-customization-concept-illustration_114360-4675.jpg?w=826&t=st=1682575209~exp=1682575809~hmac=08b1b422e358b73b2c5eb4c2c1653cacd8defad870bf1b3cdafbbb9c29440595")`,
                backgroundSize: "cover",
                width: "100%",
                height: "100vh",
              }}
            >
              <h1 style={{ fontSize: "10vh" }} className="text-muted">COMING SOON</h1>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Support;
