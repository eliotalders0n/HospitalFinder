import React from "react";
import Card from "react-bootstrap/Card";
import Sidebar from "../template/sidebar";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Main from "../template/main";

function Dashboard(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Dashboard</h2>
            <Row className="d-flex justify-content-center my-5">
              <Col md={3}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Hospitals</Card.Header>
                  <Card.Body>
                    {/* <Card.Title>Card Title </Card.Title> */}
                    <ListGroup>
                      <ListGroup.Item variant="light">
                        <b>Lusaka</b>
                      </ListGroup.Item>
                      <ListGroup.Item variant="light">
                        <b>Manhattan</b>
                      </ListGroup.Item>
                      <ListGroup.Item variant="light">
                        <b>Wuhan</b>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Users</Card.Header>
                  <Card.Body style={{ background: "4" }}>
                    {/* <Card.Title>Card Title </Card.Title> */}
                    <Card.Text className="text-center">
                      <h1 style={{ fontSize: "6rem" }}>4</h1>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Analytics</Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center">
                      <h4 style={{ fontSize: "6rem" }}>GET</h4>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Settings</Card.Header>
                  <Card.Body>
                    <Card.Text className="text-center">
                      <h4 style={{ fontSize: "6rem" }}>IT</h4>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Col>
              <Card style={{ backgroundImage : `url("https://img.freepik.com/free-vector/sentiment-analysis-concept-illustration_114360-5182.jpg?w=826&t=st=1682537138~exp=1682537738~hmac=2f593aea9011082995a39c121ebe616fecdb6a5d49423216bc79f0b13b032f98")`, backgroundSize : "contain"}}>
                <Card.Body>
                  <Row>
                    <Col md={8} style={{height : "25vh"}}>
                    <Card.Text>
                      Welcome to the HospitalFinder admin panel. Update, edit and or delete
                    </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
