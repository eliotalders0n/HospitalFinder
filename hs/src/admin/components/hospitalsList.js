import React from "react";
import Sidebar from "../template/sidebar";
import { Container, Row, Col, Table, Badge, Button  } from "react-bootstrap";
import Main from "../template/main";

function Hospitals(props) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ backgroundColor: "" }}>
          <Sidebar />
        </Col>

        <Col md={10} style={{ backgroundColor: "" }}>
          <Container fluid>
            <Main />
            <h2 className="text-muted my-5">Hospitals</h2>
            <p className="text-muted">Organise and update hospitals</p>
            <Button href="/addNewUser" className="my-3">Add New Hospital</Button>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Moscow</td>
                  <td><Button variant="outline-primary" size="sm" href="/updateHospital">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Manhattan</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Livingstone</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Moscow</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Manhattan</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Livingstone</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Moscow</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Manhattan</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Livingstone</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Moscow</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Manhattan</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>+2XX XXX XXX XXX</td>
                  <td>Livingstone</td>
                  <td><Button variant="outline-primary" size="sm">Modify</Button> <Badge bg="info">Active</Badge> </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Hospitals;