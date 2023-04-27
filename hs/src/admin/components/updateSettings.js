import React from "react";
import Sidebar from "../template/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import Main from "../template/main";

function Settings(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Settings</h2>
            <div
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/workflow-abstract-concept-illustration_335657-4441.jpg?w=826&t=st=1682541264~exp=1682541864~hmac=57de6e67841fb2a82a1a3e709aee84ee62257885ed414af7c2e92218fb6d6ea3")`,
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

export default Settings;
