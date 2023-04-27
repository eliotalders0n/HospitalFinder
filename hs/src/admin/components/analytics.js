import React from "react";
import Card from "react-bootstrap/Card";
import Sidebar from "../template/sidebar";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import Main from "../template/main";
import Vertical from "../charts/vertical";
import Horizontal from "../charts/horizontal";
import PieChart from "../charts/pie";
import Grouped from "../charts/grouped";

function Analytics(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Analytics</h2>
            <Row className="d-flex justify-content-center my-5">
              <Col md={"auto"}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Revenue</Card.Header>
                  <Card.Body>
                    <Card.Title>XXXXXX XX </Card.Title>
                    <ListGroup className="text-center">
                      <ListGroup.Item variant="success"><b>Current ZMK 2,124</b></ListGroup.Item>
                      <ListGroup.Item variant="info"><b>Total ZMK 72, 124</b></ListGroup.Item>
                      <p className="my-2">Up 4%</p>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={"auto"}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Locations</Card.Header>
                  <Card.Body>
                    <Card.Title>XXXXXX XXX</Card.Title>
                    <ListGroup>
                      <ListGroup.Item variant="light"><b>Lusaka</b></ListGroup.Item>
                      <ListGroup.Item variant="light"><b>Manhattan</b></ListGroup.Item>
                      <ListGroup.Item variant="light"><b>Wuhan</b></ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={"auto"}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Services</Card.Header>
                  <Card.Body>
                    <Card.Title>XXX XXXX </Card.Title>
                    <ListGroup>
                      <ListGroup.Item variant="light"><b>Endocrinology</b></ListGroup.Item>
                      <ListGroup.Item variant="light"><b>Psychiatry</b></ListGroup.Item>
                      <ListGroup.Item variant="light"><b>Orthopedics</b></ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              {/* <Col md={2}>
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"black"}
                  className="mb-2"
                >
                  <Card.Header>Header</Card.Header>
                  <Card.Body>
                    <Card.Title>Card Title </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col> */}
            </Row>

            <Row className="my-5">
              <Col md={4} className="my-2">
                <ListGroup as="ol" numbered>
                  <h4>Most Visited</h4>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Teba</div>
                      XXXXXX
                    </div>
                    <Badge bg="primary" pill>
                      14
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Coptic</div>
                      XXXXXX XXXXXX
                    </div>
                    <Badge bg="primary" pill>
                      50
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">University Teaching Hospital</div>
                      XXXXXX XXX
                    </div>
                    <Badge bg="primary" pill>
                      129
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={4}>
                <Vertical />
              </Col>

              <Col md={4}>
                <Horizontal />
              </Col>
            </Row>

            <Row className="my-5">
              <Col md={4}>
                <PieChart />
              </Col>

              <Col md={6}>
                <Grouped />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Analytics;
