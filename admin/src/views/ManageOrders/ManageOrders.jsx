import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CRow,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CPagination,
    CPaginationItem,
    CCardText
} from '@coreui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState('');
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [searchUser, setSearchUser] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);


    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/getOrder'); // Replace with your actual API endpoint
            setAllOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };
    // console.log(allOrders);

    const handleAddOrder = async () => {
        const newOrder = {
            user,
            product,
            price,
            orderDate,
            paymentStatus,
            orderStatus: "pending"
        };

        try {
            const response = await axios.post('http://localhost:4000/api/postOrders', newOrder); // Replace with your actual API endpoint
            setAllOrders([...allOrders, response.data]);
            resetForm();
            setVisible(false);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:4000/api/orders/${orderId}`); // Replace with your actual API endpoint
            setAllOrders(allOrders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleEditOrder = (order) => {
        setUser(order.user);
        setProduct(order.product);
        setPrice(order.price);
        setOrderDate(order.orderDate);
        setPaymentStatus(order.paymentStatus);
        setOrderStatus(order.orderStatus);
        setEditMode(true);
        setCurrentOrderId(order._id);
        setVisible(true);
    };

    const handleUpdateOrder = async () => {
        const updatedOrder = {
            user,
            product,
            price,
            orderDate,
            paymentStatus,
            orderStatus: "pending"
        };

        try {
            const response = await axios.put(
                `http://localhost:4000/api/orders/${currentOrderId}`,
                updatedOrder
            ); // Replace with your actual API endpoint
            const updatedOrderData = response.data;
            setAllOrders(
                allOrders.map((order) =>
                    order._id === currentOrderId ? { ...order, ...updatedOrderData } : order
                )
            );
            resetForm();
            setEditMode(false);
            setCurrentOrderId(null);
            setVisible(false);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const resetForm = () => {
        setUser('');
        setProduct('');
        setPrice('');
        setOrderDate('');
        setPaymentStatus('');
        setOrderStatus('');
    };

    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    };

    const filteredOrders = allOrders.filter((order) =>
        order.user.toLowerCase().includes(searchUser.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CCard>
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    <h3>Manage Orders</h3>
                    <CForm className="d-flex align-items-center" style={{ width: '12rem', marginLeft: 'auto' }}>
                        <CFormInput
                            type="text"
                            placeholder="Search by User"
                            value={searchUser}
                            onChange={handleSearchUser}
                        />
                    </CForm>
                </CCardHeader>
                <CCardBody>
                    <CCardText>

                        <CTable striped hover responsive bordered >
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Order Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Order Status</CTableHeaderCell>

                                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {allOrders.map((order, index) => (
                                    <CTableRow key={order._id}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{order.user}</CTableDataCell>
                                        <CTableDataCell>{order.product}</CTableDataCell>
                                        <CTableDataCell>{order.totalAmount}</CTableDataCell>
                                        <CTableDataCell>{order.createdAt}</CTableDataCell>
                                        <CTableDataCell>{order.paymentStatus}</CTableDataCell>
                                        <CTableDataCell>{order.orderStatus}</CTableDataCell>
                                        <CTableDataCell>


                                            {/* <CButton
                                            // color="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEditOrder(order)}
                                        >
                                            Edit
                                        </CButton>
                                        <CButton
                                            // color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        >
                                            Delete
                                        </CButton> */}






                                            {/* <CButton size="sm" onClick={() => handleEdit(user)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </CButton> */}

                                            <CButton size="sm"
                                            // onClick={() => { setSelectedUser(user); setVisible(true); }}
                                            >

                                                <FontAwesomeIcon icon={faEye}
                                                    style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }} />
                                            </CButton>

                                            <FontAwesomeIcon
                                                icon={faPen}
                                                style={{ color: "grey", cursor: 'pointer', marginRight: '5px' }}
                                                onClick={() => handleEditProduct(product)}
                                            />

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

            <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>{editMode ? 'Edit Order' : 'Add Order'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormInput
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    placeholder="User"
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    placeholder="Product"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormInput
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price"
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="date"
                                    value={orderDate}
                                    onChange={(e) => setOrderDate(e.target.value)}
                                    placeholder="Order Date"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormSelect
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                >
                                    <option value="">Select Payment Status</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                </CFormSelect>
                            </CCol>

                            <CCol>
                                <CFormSelect
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                >
                                    <option value="">Select Order Status</option>
                                    <option value="Paid">Success</option>
                                    <option value="Pending">Pending</option>
                                </CFormSelect>
                            </CCol>

                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={editMode ? handleUpdateOrder : handleAddOrder}>
                        {editMode ? 'Update' : 'Add'}
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default ManageOrders;
