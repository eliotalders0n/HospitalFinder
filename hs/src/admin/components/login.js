import React from "react";
import { Card, ListGroup, Row, Container, Col, InputGroup, Button, Form } from "react-bootstrap";

function Login(props) {
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center my-5">
        <Col md={2} className="my-5">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg?w=826&t=st=1682639471~exp=1682640071~hmac=a621b6be08fdf261d744f283bc62d89ea651cdae96620846b39f256d4088261d"
              alt="Image by storyset on Freepik"
            />
            <Card.Body>
              <Card.Title>Sign in</Card.Title>
              <Card.Text>
                Pick up were you left off, update and maintain.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Username
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="username"
                    aria-describedby="inputGroup-sizing-sm"
                    type="text"
                  />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Password
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="password"
                    aria-describedby="inputGroup-sizing-sm"
                    type="password"
                  />
                </InputGroup>   
                <Button style={{width: "100%"}} href="/admin">Login</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
