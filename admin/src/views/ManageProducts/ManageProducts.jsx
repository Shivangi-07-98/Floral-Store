import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination, 
  CPaginationItem,
  CCardText
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flowerType, setFlowerType] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [image, setImage] = useState(false);

  // const [productDetails, setProductDetails] = useState({
  //   flowerType: flowerType,
  //   image: image,
  //   category: occasion,
  //   price: price,
  //   color: color,
  //   style: style
  // })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/products/allproducts');
      setProducts(response.data.products);
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const handleAddProduct = async () => {
    let responseData;
    const product = {
      flowerType,
      price,
      color,
      style,
      occasion,
      image
    };
    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/api/products/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/api/products/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),

      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product Added") : alert("Failed")
      })
      window.location.reload();
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setFlowerType(product.flowerType);
    setPrice(product.price);
    setColor(product.color);
    setStyle(product.style);
    setOccasion(product.occasion);
    setImage(null);
    setEditMode(true);
    setCurrentProductId(product._id);
    setVisible(true);
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append('flowerType', flowerType);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('style', style);
    formData.append('occasion', occasion);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/products/${currentProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedProduct = response.data;

      setProducts(products.map((product) => (product._id === currentProductId ? { ...product, ...updatedProduct } : product)));

      // Reset form fields
      setFlowerType('');
      setPrice('');
      setColor('');
      setStyle('');
      setOccasion('');
      setImage(null);
      setEditMode(false);
      setCurrentProductId(null);
      setVisible(false);
      window.alert('Product successfully updated');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h3>Manage Products</h3>
          <CButton color="primary" size="sm" onClick={() => setVisible(true)}>
            Add Product
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CCardText>
          {products.length == 0 ? (
            <div>No products found.</div>
          ) : (
            <CTable responsive striped hover bordered >
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Flower Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Color</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Style</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Occasion</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((product, index) => (
                  <CTableRow key={product._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{product.name}</CTableDataCell>
                    <CTableDataCell>{product.new_price}</CTableDataCell>
                    <CTableDataCell>{product.color}</CTableDataCell>
                    <CTableDataCell>{product.style}</CTableDataCell>
                    <CTableDataCell>{product.category}</CTableDataCell>
                    <CTableDataCell>
                      {product.image ? (
                        <img src={`http://localhost:4000/images/${product.image}`} alt={product.flowerType} style={{ width: '100px' }} />
                      ) : (
                        'No image'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>





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

      <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>{editMode ? 'Edit Product' : 'Add Product'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="text"
                  value={flowerType}
                  onChange={(e) => setFlowerType(e.target.value)}
                  placeholder="Flower Type"
                />
              </CCol>
              <CCol>
                <CFormInput
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect value={color} onChange={(e) => setColor(e.target.value)}>
                  <option value="">Select Color</option>
                  <option value="blue">Blue</option>
                  <option value="bright">Bright</option>
                  <option value="lavender">Lavender</option>
                  <option value="mixed">Mixed</option>
                  <option value="orange">Orange</option>
                  <option value="pastel">Pastel</option>
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                  <option value="white">White</option>
                  <option value="yellow">Yellow</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormSelect value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option value="">Select Style</option>
                  <option value="luxurious">Luxurious</option>
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  <option value="">Select Occasion</option>
                  <option value="mothers-day">Mother's Day</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="romance">Romance</option>
                  <option value="birthday">Birthday</option>
                  <option value="get-well">Get Well</option>
                  <option value="new-baby">New Baby</option>
                  <option value="graduation">Graduation</option>
                  <option value="sympathy">Sympathy</option>
                  <option value="funeral">Funeral</option>
                  <option value="thinking-of-you">Thinking of You</option>
                  <option value="just-because">Just Because</option>
                  <option value="thank-you">Thank You</option>
                  <option value="congratulations">Congratulations</option>
                  <option value="love-and-romance">Love and Romance</option>
                  <option value="housewarming">Housewarming</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormInput type="file" onChange={(e) => setImage(e.target.files[0])} />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={editMode ? handleUpdateProduct : handleAddProduct}>
            {editMode ? 'Update' : 'Add'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ManageProducts;
