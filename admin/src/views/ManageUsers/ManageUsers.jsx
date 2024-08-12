import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CRow,
  CCol,
  CCardText,
  CButton,
  CTable,
  CTableHead,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CPagination, 
  CPaginationItem,
  
} from '@coreui/react';


const ManageUsers = () => {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const fetchUserManageData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users/users');
      console.log('res',response)
      setUserArray(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user manage data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserManageData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  // const handleAddOrUpdateUser = async (e) => {
  //   e.preventDefault();
  //   if (editing) {
  //     try {
  //       const response = await axios.put(`http://localhost:4000/api/userManageData/${editUserId}`, userForm);
  //       setUserArray(userArray.map(user => user._id === editUserId ? response.data : user));
  //       window.alert('User successfully updated');
  //     } catch (error) {
  //       console.error('Error updating user:', error);
  //     }
  //   } else {
  //     try {
  //       const response = await axios.post('http://localhost:4000/api/users/users', userForm);
  //       setUserArray([...userArray, response.data]);
  //       window.alert('User successfully added');
  //     } catch (error) {
  //       console.error('Error adding user:', error);
  //     }
  //   }

  //   setUserForm({
  //     name: '',
  //     email: '',
  //     contact: ''
  //   });
  //   setShowModal(false);
  //   setEditing(false);
  //   setEditUserId(null);
  // };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/userManageData/${id}`);
      setUserArray(userArray.filter(user => user._id !== id));
      window.alert('User successfully deleted');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setUserForm(user);
    setEditUserId(user._id);
    setEditing(true);
    setShowModal(true);
  };

  const toggleModal = () => setShowModal(!showModal);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <CCard className="d-flex 100%">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Users</h3>
          {/* <CButton
            color="primary"
            size="sm"
            className="me-md-2"
            onClick={() => {
              setShowModal(true);
              setEditing(false);
              setEditUserId(null);
              setUserForm({
                name: '',
                email: '',
                contact: ''
              });
            }}
          >
            ADD USER
          </CButton> */}
        </CCardHeader>
        <CCardBody>
          <CCardText>
            {userArray.length === 0 ? (
              <div className="no-data">No user data found.</div>
            ) : (
              <CRow>
                <CCol>
                  <CTable responsive striped hover bordered >
                    <CTableHead color="dark">
                      <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {userArray.map((user, index) => (
                        <CTableRow key={user._id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{user.name}</CTableDataCell>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          <CTableDataCell>{user.mobileNumber}</CTableDataCell>
                          <CTableDataCell>



                            {/* <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ cursor: "pointer", marginRight: "10px" }}
                              onClick={() => handleEditUser(user)}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteUser(user._id)}
                            /> */}


                            


                      {/* <CButton size="sm" onClick={() => handleEdit(user)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </CButton> */}

                      <CButton size="sm"
                      // onClick={() => { setSelectedUser(user); setVisible(true); }}
                      >

                        <FontAwesomeIcon icon={faEye}
                        style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }} />
                      </CButton>

                      {/* <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }}
                        onClick={() => handleEditProduct(product)}
                      /> */}

                      <CButton size="sm" onClick={() => handleDelete(user._id)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "#fd2b2b" }}
                        />
                      </CButton>








                      {/* <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteProduct(product._id)}
                      /> */}








                            
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCol>
              </CRow>
            )}



          </CCardText>

          <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem disabled aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>

        </CCardBody>
      </CCard>

      <CModal
        size="lg"
        visible={showModal}
        onClose={toggleModal}
        aria-labelledby="AddUsersModalTitle"
        
      >
        <CModalHeader closeButton>
          <CModalTitle id="AddUsersModalTitle">{editing ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        {/* <CModalBody>
          <CForm onSubmit={handleAddOrUpdateUser} >
            <CRow className="mb-3">
              <CCol md>
                <CFormInput
                  type="text"
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  value={userForm.name}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md>
                <CFormInput
                  type="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  name="email"
                  value={userForm.email}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md>
                <CFormInput
                  type="text"
                  label="Contact"
                  placeholder="Enter Contact"
                  name="contact"
                  value={userForm.contact}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton type="button" color="secondary" onClick={toggleModal}>Close</CButton>
              <CButton type="submit" color="primary">{editing ? 'Update User' : 'Add User'}</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody> */}
      </CModal>
    </>
  );
};

export default ManageUsers;
