import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Table } from '@coreui/react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    profileImage: '',
    jobTitle: ''
  });

  const [userArray, setUserArray] = useState([
    // Dummy data for demonstration
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      jobTitle: 'Developer',
      _id: 1
    }
  ]);

  const handleFileInput = (e) => {
    // Handle file input
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <Card.Header>
            <div className="d-flex align-items-center justify-content-between my-5">
              Users
              <div className="d-flex align-items-center">              
                <Button className="ms-md-2" onClick={toggleModal}>Add User</Button>
              </div>
            </div>
          </Card.Header>
          <Modal size="lg" show={showModal} onHide={toggleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={userForm.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={userForm.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={userForm.username}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        name="email"
                        value={userForm.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md>
                    <Form.Group controlId="password">
                      <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={userForm.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group controlId="mobileNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Mobile Number"
                        name="mobileNumber"
                        value={userForm.mobileNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md>
                    <Form.Group controlId="profileImage">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="profileImage"
                        onChange={handleFileInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group controlId="jobTitle">
                      <Form.Label>Job Title <span style={{ color: 'red' }}>*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Title"
                        name="jobTitle"
                        value={userForm.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="secondary" onClick={toggleModal}>Close</Button>
                <Button variant="success" type="submit" className="ms-2">Save</Button>
              </Form>
            </Modal.Body>
          </Modal>
          <Card.Body>
            <Table hover responsive striped className="mb-0 border">
              <thead className="bg-light">
                <tr>
                  <th className="text-center">Avatar</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userArray.map((user, i) => (
                  <tr key={i}>
                    <td className="text-center">
                      <div className="avatar">
                        <img src="./assets/img/avatars/6.jpg" alt="User Avatar" className="rounded-circle" />
                      </div>
                    </td>
                    <td>
                      <div>{user.firstName} {user.lastName}</div>
                      <div className="small text-muted">New | Registered: Jan 1 2023</div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.jobTitle}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id={`flexSwitchCheckDefault${i}`} />
                        <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${i}`}></label>
                      </div>
                    </td>
                    <td>
                      <Button variant="warning" className="btn-sm me-2">
                        <i className="fa fa-edit"></i>
                      </Button>
                      <Button variant="danger" className="btn-sm">
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserManagement;
