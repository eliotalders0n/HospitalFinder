import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./template/head";
import Footer from "./template/footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Container,
  ListGroup,
  Form,
  InputGroup,
  Card,
  Row,
  Col,
  Button,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

const Search = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:505000,-15.416667, 28.283333);out;"
      )
      .then((response) => {
        setHospitals(response.data.elements);
        // console.log("Hospitals" + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Get current location
  const [position, setPosition] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => setPosition(position.coords),
        (error) => console.log(error),
        options
      );
    } else {
      console.log("Geolocation not available");
    }
  }, []);

  useEffect(() => {
    if (position) {
      setLat(position.latitude);
      setLng(position.longitude);
      console.log(`Current location: ` + lat + ` - ` + lng);
    }
  }, [position, lat, lng]);

  const [visible, setVisible] = useState(4);
  const limit = hospitals.slice(0, visible);

  const handleShowMore = () => {
    setVisible(visible + 4);
  };

  // show card modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleCloseModal = () => {
    setModalContent(null);
    setShowModal(false);
  };
  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Search function
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function handleSearch() {
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:505000,-15.416667, 28.283333);out;`
    );
    const data = await response.json();
    setSearchResults(data.elements);
  }

  return (
    <>
      <Head />
      <Container fluid className="text-center d-flex justify-content-center">
        <ListGroup horizontal>
          <Row>
            <Col md={3}>
              <InputGroup className="mb-3 ">
                <Form.Control
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Default"
                  aria-describedby="inputGroup-search"
                />
                <OverlayTrigger
                  trigger={"click"}
                  placement={"bottom"}
                  overlay={
                    <Popover>
                      <Popover.Header as="h3">result</Popover.Header>
                      <Popover.Body
                        style={{ overflowY: "auto", maxHeight: "50vh" }}
                      >
                        {searchResults
                          .filter((result) =>
                            new RegExp(searchQuery, "i").test(result.tags.name)
                          )
                          .map((result) => (
                            <Card key={result.id}>
                              <Card.Body>
                                <Card.Title>{result.tags.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          ))}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button className="bg-dark" onClick={handleSearch}>
                    Search
                  </Button>
                </OverlayTrigger>
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Select aria-label="Default select example">
                <option>Hospital Services</option>
                <option value="1">Primary care</option>
                <option value="2">Urgent care</option>
                <option value="3">Emergency care</option>
                <option value="4">Diagnostic services </option>
                <option value="5">Rehabilitation services</option>
                <option value="6">Mental health services</option>
                <option value="7">Specialty care</option>
                <option value="8">Preventive care</option>
                <option value="9">Hospice and palliative care</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select aria-label="Default select example">
                <option>Specialty </option>
                <option value="1">Cardiology</option>
                <option value="2">Dermatology</option>
                <option value="3">Endocrinology</option>
                <option value="4">Gastroenterology</option>
                <option value="5">Hematology/Oncology</option>
                <option value="6">Neurology</option>
                <option value="7">Obstetrics and Gynecology</option>
                <option value="8">Ophthalmology</option>
                <option value="9">Orthopedics</option>
                <option value="10">Pediatrics</option>
                <option value="11">Psychiatry</option>
                <option value="11">Pulmonology</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select aria-label="Default select example">
                <option>Facility</option>
                <option value="1">Hospital</option>
                <option value="2">Clinic</option>
                <option value="3">Rehabilitation center</option>
                <option value="4">Hospice</option>
                <option value="5">Imaging center</option>
                <option value="6">Mental health facility</option>
              </Form.Select>
            </Col>
          </Row>
        </ListGroup>
        <hr />
      </Container>
      <Container fluid>
        <Row>
          <Col md={6}>
            {/* Map goes here */}
            <MapContainer
              className="my-4"
              style={{ height: "70vh" }}
              center={[-15.416667, 28.283333]} //lat, lng
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lon]}
                >
                  <Popup>{hospital.tags.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </Col>
          <Col md={6}>
            <Container
              fluid
              className="d-flex justify-content-center"
              style={{
                height: "70vh",
                overflowY: "auto",
              }}
            >
              <Row>
                {limit.map((hospital, index) => (
                  <Card
                    className="mx-3 my-3"
                    style={{ width: "40%" }}
                    key={hospital.id}
                  >
                    <Card.Img
                      variant="top"
                      src="https://img.freepik.com/free-vector/therapist-working-with-patient-rehabilitation-center-rehabilitation-center-rehabilitation-hospital-stabilization-medical-conditions-concept-bright-vibrant-violet-isolated-illustration_335657-533.jpg?w=1380&t=st=1681766543~exp=1681767143~hmac=1c67ebe47a0164cc98f54d533d2b250647d3b481a9e6b2b5535145714a5f6be3"
                    />
                    <Card.Body>
                      <Card.Title>{hospital.tags.name}</Card.Title>
                      <Card.Text>
                        {hospital.tags.locality}
                        <br />
                        {hospital.tags.operator}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(hospital)}
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
                <Modal show={showModal} fullscreen onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h1>
                        Hospital<span style={{ color: "purple" }}>Finder</span>
                      </h1>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container fluid>
                      <Row>
                        <Col md={7}>
                          <img
                            src="https://img.freepik.com/free-vector/therapist-working-with-patient-rehabilitation-center-rehabilitation-center-rehabilitation-hospital-stabilization-medical-conditions-concept-bright-vibrant-violet-isolated-illustration_335657-533.jpg?w=1380&t=st=1681766543~exp=1681767143~hmac=1c67ebe47a0164cc98f54d533d2b250647d3b481a9e6b2b5535145714a5f6be3"
                            alt="test 1"
                            style={{
                              width: "100%",
                              marginBottom: "20px",
                              boxShadow: "6px 6px 12px 4px rgba(0,0,0,0.2)",
                            }}
                          />
                        </Col>
                        <Col md={5}>
                          <h2>{modalContent?.tags.name}</h2> <hr />
                          <br />
                          <h3>Overview</h3>
                          <br />
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-book-fill"></i>{" "}
                            {modalContent?.tags.amenity}
                          </p>
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-envelope-at-fill"></i>{" "}
                            {modalContent?.tags.email}
                          </p>
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-hospital-fill"></i> Emergency
                            {modalContent?.tags.emergency}
                          </p>
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-person-fill"></i>{" "}
                            {modalContent?.tags.operator}
                          </p>{" "}
                          <br />
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-bandaid-fill"></i> Wheelchair{" "}
                            {modalContent?.tags.wheelchair}
                          </p>
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-telephone-fill"></i>{" "}
                            {modalContent?.tags.phone}
                          </p>
                          <br />
                          <p style={{ fontSize: "1.5rem" }}>
                            <i class="bi bi-share-fill"></i>{" "}
                            {modalContent?.tags.website}
                          </p>{" "}
                          <br />
                          <hr />
                          <h3>Description</h3>
                          <p style={{ fontSize: "1.5rem" }}>
                            {modalContent?.tags.description}
                          </p>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={3}>
                          <img
                            src="https://img.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg?size=626&ext=jpg&ga=GA1.1.2055941900.1681266190&semt=ais"
                            alt="test 2"
                            style={{
                              width: "44vh",
                              boxShadow: "6px 6px 12px 4px rgba(0,0,0,0.2)",
                            }}
                          />
                        </Col>
                        <Col md={3}>
                          <img
                            src="https://img.freepik.com/free-vector/flat-hand-drawn-hospital-reception-scene_52683-55313.jpg?size=626&ext=jpg&ga=GA1.1.2055941900.1681266190&semt=ais"
                            alt="test3"
                            style={{
                              width: "44vh",
                              boxShadow: "6px 6px 12px 4px rgba(0,0,0,0.2)",
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>
            </Container>
          </Col>
          <Button onClick={handleShowMore}>More</Button>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Search;
