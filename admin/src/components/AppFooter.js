import React from 'react'
import {Link} from "react-router-dom"
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <Link to="/login">
          Flower Website
        </Link>
        <span className="ms-1">&copy; 2024 Aayan Infotech.</span>
      </div>
      <div className="ms-auto">
        {/* <span className="me-1">Powered by</span> */}
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
