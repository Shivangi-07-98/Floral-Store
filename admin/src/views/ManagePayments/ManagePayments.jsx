import React from 'react'
import { CCard, CContainer, CButton, CSpinner, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCardHeader, CCardBody, CPagination, 
  CPaginationItem, CCardText } from '@coreui/react'

function ManagePayment() {

  return (
    <>
{/*     
<CButton color="primary" disabled>
  <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
  Loading...
</CButton> */}

<CCard>
  <CCardHeader className="d-flex justify-content-between align-items-center">
  <h3>Manage Payment</h3>
  <CButton color="primary" size="sm" onClick={() => setVisible(true)}>
            Add Product
          </CButton>
  </CCardHeader>
  <CCardBody>
  <CCardText>

    
<CTable responsive hover striped bordered >
  <CTableHead color="dark" style={{padding: "1rem"}}>
    <CTableRow>
      <CTableHeaderCell scope="col">#</CTableHeaderCell>
      <CTableHeaderCell scope="col">Class</CTableHeaderCell>
      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
      <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody style={{padding: "1rem"}}>
    <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Mark</CTableDataCell>
      <CTableDataCell>Otto</CTableDataCell>
      <CTableDataCell>@mdo</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Jacob</CTableDataCell>
      <CTableDataCell>Thornton</CTableDataCell>
      <CTableDataCell>@fat</CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      {/* <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell> */}
      <CTableDataCell >Larry </CTableDataCell>
      <CTableDataCell >Bird</CTableDataCell>
      <CTableDataCell>@twitter</CTableDataCell>
    </CTableRow>
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


    </>
  )
}

export default ManagePayment