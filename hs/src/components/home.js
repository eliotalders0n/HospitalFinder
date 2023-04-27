import React from "react";
import Head from "./template/head";
import Footer from "./template/footer";
import {
  Container,
  Form,
  Col,
  Row,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

function Home(props) {
  return (
    <>
      <Head />
      <Container
        fluid
        className="text-center d-flex justify-content-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1666214280250-41f16ba24a26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          height: "50vh",
        }}
      >
        <Row>
          <Col md={12}>
            <p style={{ fontSize: "5vh", paddingTop: "10vh", color: "white" }}>
              Good Health is Wealth
            </p>
          </Col>

          <Col md={12}>
            <Form className="my-5">
              <Form.Group className="mb-3" controlId="Search">
                <Form.Control
                  type="email"
                  placeholder="Enter an Address, Neighborhood, City"
                  style={{
                    paddingLeft: "10vh",
                    paddingRight: "10vh",
                    paddingTop: "2vh",
                    paddingBottom: "2vh",
                    fontSize: "2vh",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    marginBottom: "4vh",
                  }}
                />
                <Form.Text className="text-muted">
                  <span style={{ color: "purple" }}>HospitalFinder.com</span>
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col md={12}>
            <Card border="light" className="text-center my-5">
              <Card.Body>
                <Card.Title style={{ fontSize: "3rem" }}>
                  Find a Hospital Now
                </Card.Title>
                <Card.Text style={{ fontSize: "2.5rem" }}>
                  Don't wait any longer, locate a hospital near you and receive
                  the care you deserve
                </Card.Text>
                <Button variant="primary">
                  <h2>Search</h2>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card
              className="text-center my-3"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
                height: "25vh",
                backgroundSize: "cover",
              }}
            >
              <Card.Title>
                <h1
                  style={{
                    marginTop: "10vh",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "2vh",
                  }}
                >
                  Easy Search
                </h1>
              </Card.Title>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="text-center my-3"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
                height: "25vh",
                backgroundSize: "cover",
              }}
            >
              <Card.Title>
                <h1
                  style={{
                    marginTop: "10vh",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "2vh",
                  }}
                >
                  High quality service that puts you first
                </h1>
              </Card.Title>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="text-center my-3"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1563233269-7e86880558a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
                height: "25vh",
                backgroundSize: "cover",
              }}
            >
              <Card.Title>
                <h1
                  style={{
                    marginTop: "10vh",
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "2vh",
                  }}
                >
                  We Care about you
                </h1>
              </Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <Container className="d-flex justify-content-center my-5">
        <Row className="text-center justify-content-center">
          <Col md={4}>
            <Card
              style={{ minWidth: "24rem", maxHeight: "44rem" }}
              className="my-3"
            >
              <Card.Img
                variant="top"
                src="https://img.freepik.com/free-vector/flat-hand-drawn-hospital-reception-scene_52683-54613.jpg?w=1380&t=st=1681266256~exp=1681266856~hmac=c7d9dab71b0764b39ea2bfbd1f87a1d7f5d7f3abdfbe3eafa799c5a12c1a1898"
              />
              <Card.Body>
                <Card.Title>Efficiency</Card.Title>
                <Card.Text>
                  We're here to help you find the perfect hospital match - one
                  that ticks all the boxes for efficiency, convenience, and
                  safety. You can trust us to guide you every step of the way
                </Card.Text>
                <Button variant="primary">Browse Hospitals</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{ minWidth: "24rem", maxHeight: "44rem" }}
              className="my-3 "
            >
              <Card.Img
                variant="top"
                src="https://img.freepik.com/free-vector/tiny-doctors-patients-near-hospital-flat-vector-illustration-therapist-face-mask-saying-goodbye-cured-people-near-medical-building-ambulance-emergency-clinic-concept_74855-25338.jpg?w=1380&t=st=1681266395~exp=1681266995~hmac=cf416a26c4a8980afe207aa8cba6d26c45476003739c76fe8f65c0d871761c70"
              />
              <Card.Body>
                <Card.Title>Convenience</Card.Title>
                <Card.Text>
                  Searching for a hospital shouldn't be a hassle. Our site makes
                  it easy to find top-rated hospitals that offer the best care,
                  all while prioritizing your convenience and safety.
                </Card.Text>
                <Button variant="primary">See your options</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{ minWidth: "24rem", maxHeight: "44rem" }}
              className="my-3 "
            >
              <Card.Img
                variant="top"
                src="https://img.freepik.com/free-vector/therapist-working-with-patient-rehabilitation-center-rehabilitation-center-rehabilitation-hospital-stabilization-medical-conditions-concept-bright-vibrant-violet-isolated-illustration_335657-533.jpg?w=1380&t=st=1681266512~exp=1681267112~hmac=c2e3e38f12ba9cfccb5bb0306e7a03acf092d2416606dbd59b0ce136b1f529d5"
              />
              <Card.Body>
                <Card.Title>Safety</Card.Title>
                <Card.Text>
                  Let us help you take the guesswork out of finding a hospital.
                  Our site is designed to provide you with a seamless,
                  stress-free experience that's both efficient and safe. We've
                  got your back!
                </Card.Text>
                <Button variant="primary">Learn more</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="text-center d-flex justify-content-center">
        <Row>
          <Col md={12} className="text-center d-flex justify-content-center">
            <ListGroup horizontal={"sm"} className="my-1">
              <ListGroup.Item>Service type</ListGroup.Item>
              <ListGroup.Item>Location</ListGroup.Item>
              <ListGroup.Item>Ratings</ListGroup.Item>
              <ListGroup.Item>More</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={12} className="text-center d-flex justify-content-center">
            <ListGroup horizontal={"sm"} className="my-1">
              <ListGroup.Item>About</ListGroup.Item>
              <ListGroup.Item>Careers</ListGroup.Item>
              <ListGroup.Item>Help</ListGroup.Item>
              <ListGroup.Item>Terms of use</ListGroup.Item>
              <ListGroup.Item>Privacy policy</ListGroup.Item>
              <ListGroup.Item>Cookie reference</ListGroup.Item>
              <ListGroup.Item>Advertise</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
