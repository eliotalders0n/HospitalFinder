import React from "react";
import { Navbar, Container, Form, InputGroup } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function Sidebar(props) {
  return (
    <Navbar bg="light" expand="md" className="mb-3">
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        {/* <Navbar.Brand href="#">HospitalFinder</Navbar.Brand> */}
        <Navbar.Collapse className="justify-content-end">
            <Nav
              defaultActiveKey="/home"
              className="flex-column"
              style={{
                boxShadow: "4px 8px 10px 4px rgba(60,100,100,0.2)",
                marginTop: "10vh",
                borderRadius: "10px",
                padding: "5vh"
              }}
            >
              <InputGroup size="sm">
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <Form.Control
                placeholder="hospital  service  user"
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

              <p style={{ alignSelf: "center", paddingTop: "2vh", fontSize: "2vh" }}>
                Ahmed Tennor
              </p>
              <img
                src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?w=826&t=st=1682413949~exp=1682414549~hmac=307b56a5509b7d1d84b833f2e6c3490cfb4c16b0ba5827921cba95e765640402"
                style={{
                  width: "12vh",
                  alignSelf: "center",
                  paddingTop: "1vh",
                }}
                alt="profile"
              />
              <br />
              <br />
              <Nav.Link href="/dashboard">
                <h4>Dashboard</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/hospitals">
                <h4>Hospitals</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/users">
                <h4>Users</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/analytics">
                <h4>Analytics</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/settings">
                <h4>Settings</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/support">
                <h4>Support</h4>
              </Nav.Link>
              <br />
              <Nav.Link href="/">
                <h4>Logout</h4>
              </Nav.Link>
              <br />
              <Nav.Link eventKey="disabled" disabled>
                <p>HospitalFinder</p>
              </Nav.Link>
              <br />
            </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
