import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer(props) {
  return (
    <Container fluid className="text-center" style={{ bottom: "0" }}>
      <hr />
      <p className="text-muted" style={{ fontSize: "1rem" }}>
        HospitalFinder is committed to ensuring digital accessibility for
        individuals with disabilities.
        <br /> We are continuously working to improve the accessibility of our
        web experience for everyone, and we welcome feedback and accommodation
        requests.
        <br /> If you wish to report an issue or seek an accommodation, please
        let us know.
      </p>
      <br />
      <p className="text-muted" style={{ fontSize: "12px" }}>
        For listings in our site, the trademark HospitalFinder®,
        HospitalFinders®, and the HospitalFinder® logo are controlled by our
        organization and identify hospital professionals who are affiliated with
        our platform.
        <br /> The trademarks MLS®, Multiple Listing Service® and the associated
        logos are owned by our organization and identify the quality of services
        provided by hospital professionals who are affiliated with our platform.
        Used under license.
      </p>
      <br />
      <br />
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <h3>
            Hospital<span style={{ color: "purple" }}>Finder</span>
          </h3>
        </Col>
        <Col md={4}>
          <img
            style={{ width: "6vh", padding: "1vh" }}
            src="https://img.freepik.com/free-icon/facebook-logo-with-rounded-corners_318-9850.jpg?w=826&t=st=1681268797~exp=1681269397~hmac=3c756bbbbcdbd0de36a0e666615a6fb4215e4de097d898ad8da97fd3b897eaa9"
            alt="facebook"
          />
          <img
            style={{ width: "6vh", padding: "1vh" }}
            src="https://cdn-icons-png.flaticon.com/512/889/889147.png?w=826&t=st=1681268841~exp=1681269441~hmac=3746d862ece9c96b51c0f6f7b73ffa89c83b2e9da5bfa0067cfc2c714107bda7"
            alt="twitter"
          />
          <img
            style={{ width: "6vh", padding: "1vh" }}
            src="https://cdn-icons-png.flaticon.com/512/174/174855.png?w=826&t=st=1681268955~exp=1681269555~hmac=833e99cc58daa02f209b82028831954dceabd58f0e2671aeb49ea0157720f531"
            alt="instagram"
          />
          <img
            style={{ width: "6vh", padding: "1vh" }}
            src="https://cdn-icons-png.flaticon.com/512/124/124011.png?w=826&t=st=1681269030~exp=1681269630~hmac=69b32f0e3fe746abac202fbc5d66e0174889918e75d423bb93f18bf1f0532c0b"
            alt="linkedin"
          />
        </Col>
        <Col md={4}>
          <p className="text-muted">
            © 2023 Hospital<span style={{ color: "purple" }}>Finder</span>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <img
            src="https://img.freepik.com/free-vector/patients-doctors-meeting-waiting-clinic-hall-hospital-interior-illustration-with-reception-person-wheelchair-visiting-doctor-office-medical-examination-consultation_74855-8496.jpg?w=1380&t=st=1681268120~exp=1681268720~hmac=59cbf50bb53a017bac14e216646be335ba1c3794268a31c1d9b10097f39d083e"
            alt="Patients and doctors meeting and waiting in clinic hall. hospital interior illustration with reception, person in wheelchair."
            style={{ width: "30vh" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
