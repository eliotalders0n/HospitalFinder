import React, { useState, useEffect } from "react";

import firebaseConfig from "../../firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Sidebar from "../template/sidebar";
import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Main from "../template/main";

firebase.initializeApp(firebaseConfig);

const collectionPath = "users";

function Users(props) {
  const [users, setUsers] = useState([]);

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
        setUsers(data);
      });

    return () => list();
  }, []);

  const navigate = useNavigate();
  const handleEdit = (id) => {
    // Handle edit button click
    navigate(`/updateUsers/${id}`);
  };

  async function deleteItem(usersID) {
    try {
      await firebase.firestore().collection("users").doc(usersID).delete();
      console.log(`User with ID ${usersID} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function handleDelete(usersID) {
    if (
      window.confirm(`Are you sure you want to delete item with ID ${usersID}?`)
    ) {
      deleteItem(usersID);
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
            <h2 className="text-muted my-5">Users</h2>
            <p className="text-muted">Organise and update users</p>
            <Button href="/addNewUsers" className="my-3">
              Add New User
            </Button>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(user.id)}
                      >
                        Modify
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <Badge bg="info" className="mx-2">
                        Active
                      </Badge>{" "}
                    </td>
                  </tr>
                ))}{" "}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Users;
