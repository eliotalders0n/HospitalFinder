import React, { useState, useEffect } from "react";

import firebaseConfig from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Sidebar from "../template/sidebar";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Main from "../template/main";

firebase.initializeApp(firebaseConfig);

const collectionPath = "hospitals";

function Hospitals(props) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Get Firestore data
    const list = firebase
      .firestore()
      .collection(collectionPath)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHospitals(data);
      });

    return () => list();
  }, []);

  const navigate = useNavigate();
  const handleEdit = (id) => {
    // Handle edit button click
    navigate(`/updateHospital/${id}`);
  };

  async function deleteItem(hospitalID) {
    try {
      await firebase.firestore().collection("hospitals").doc(hospitalID).delete();
      console.log(`Item with ID ${hospitalID} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function handleDelete(hospitalID) {
    if (
      window.confirm(
        `Are you sure you want to delete item with ID ${hospitalID}?`
      )
    ) {
      deleteItem(hospitalID);
    }
  }

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
            <Button href="/addNewHospital" className="my-3">
              Add New Hospital
            </Button>
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
                {hospitals.map((hospital) => (
                  <tr key={hospital.id}>
                    <td>{hospital.id}</td>
                    <td>{hospital.name}</td>
                    <td>{hospital.email}</td>
                    <td>{hospital.phone}</td>
                    <td>{hospital.address}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(hospital.id)}
                      >
                        Modify
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(hospital.id)}
                      >
                        Delete
                      </Button>
                      <Badge bg="info" className="mx-2">
                        Active
                      </Badge>{" "}
                    </td>
                  </tr>
                ))}

                
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Hospitals;
