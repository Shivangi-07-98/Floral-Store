import React, { useContext, useState, useEffect } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [filters, setFilters] = useState({
    price: '',
    occasions: '',
    flowerType: '',
    color: '',
    style: '',
  });
  useEffect(() => {
      fetchData()
  }, [filters, sortOption])
  const handleFilterChange = (e, category, value) => {
    console.log(category   ,   value);
    setFilters(prevFilters => {
      if (category === 'price') {
        return {
          ...prevFilters,
          [category]: prevFilters[category] === value ? '' : value
        };
      } else {
        return {
          ...prevFilters,
          [category]: e.target.checked ? value : ''
        };
      }
    });
  };
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/products/allProducts', { ...filters, sortOption });
      setAllProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  return (
    <>
      <div className='navbar1'>
        <Link to="/" style={{textDecoration: "none", color: "white"}}><div>FLOWERS</div></Link>
        
        {/* <div className='input'>
          <input type="text" placeholder='Search for flowers' />
          <div className='icon'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div> */}

        <div className='menu'>
          <Link to='/wishlist' className='link'>
            <p>
              {/* <i class="fa-regular fa-heart"></i> */}
              {/* Wishlist */}
            </p>
          </Link>
          {/* <Link to='/login' className='link'>
                      <p>
                        <i class="fa-solid fa-cart-shopping"></i>
                        Login
                        </p>
                    </Link> */}
          {/* <Link to='/signup' className='link'><p>Signup</p></Link> */}

          {localStorage.getItem('auth-token')?
          <p className='auth' onClick={() => {localStorage.removeItem('auth-token');
            window.location.replace('/')}}>Logout</p >
            :<Link className='link' to='/login'><p className='auth'>Login</p></Link>}

          {/* <Link to='/login' className='link'>
            <p>
              <i class="fa-regular fa-circle-user"></i>
              Login
            </p></Link> */}

          {/* <p onClick={handleLoginClick}>Login</p>
                    <p onClick={handleSignupClick}>Signup</p> */}
        </div>
      </div>

      <div className='navbar2'>
        {/* <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>Flowers</p>
      </div> */}
        <ul className='nav-menu'>
          <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>

          <li onClick={() => { setMenu("occasion") }}>
            <Link style={{ textDecoration: 'none' }} to='/womens'>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Occasion
            </button>
            <ul className="dropdown-menu">
              <Link to='/mothers-day' style={{ textDecoration: 'none' }}><li checked={filters.occasions === 'mothers-day' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'mothers-day')}><a className="dropdown-item" href="#">Mother's Day</a></li></Link>
              <Link to='/anniversary' style={{ textDecoration: 'none' }}><li checked={filters.occasions === 'anniversary' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'anniversary')}><a className="dropdown-item" href="#">Anniversary</a></li></Link>

              {/* <Link to='/birthday' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Birthday</a></li></Link> */}

              <Link to='/congrats' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Congrats</a></li></Link>
              <Link to='/get-well' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Get well</a></li></Link>
              <Link to='/graduation' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Graduation</a></li></Link>
              <Link to='/i-am-sorry' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">I'm Sorry</a></li></Link>
              <Link to='/just-because' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Just Because</a></li></Link>
              <Link to='/love-romance' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Love and Romance</a></li></Link>
              <Link to='/new-baby' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">New Baby</a></li></Link>
              <Link to='/spring' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Spring</a></li></Link>
              <Link to='/sympathy-funeral' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Sympathy and Funeral</a></li></Link>
              <Link to='/thankyou' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Thankyou</a></li></Link>
              {/* <Link to='/wedding' style={{ textDecoration: 'none' }}><li><a className="dropdown-item" href="#">Wedding</a></li></Link> */}
            </ul>
          </div>
              </Link>
          {/* {menu === 'occasion' ? <hr /> : <></>} */}
          </li>


          <li onClick={() => { setMenu("custom-arrangement") }}><Link style={{ textDecoration: 'none' }} to='/custom-arrangement'>Custom Arrangement</Link>{menu === 'custom-arrangement' ? <hr /> : <></>}</li>

          <li onClick={() => { setMenu("subscription") }}><Link style={{ textDecoration: 'none' }} to='/subscription'>Subscription</Link>{menu === 'subscription' ? <hr /> : <></>}</li>


          <li onClick={() => { setMenu("event") }}><Link style={{ textDecoration: 'none' }} to='/'>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Events
            </button>
            <ul className="dropdown-menu">
              <Link to='/event-consultation' style={{textDecoration: 'none'}}>
              <li><a className="dropdown-item" href="#">Event Consultaion</a></li>
              </Link>
              <Link to='/event-gallery' style={{textDecoration: 'none'}}>
              <li><a className="dropdown-item" href="#">Event Gallery</a></li>
              </Link>
              
            </ul>
          </div>
            </Link>
            </li>


          <li onClick={() => { setMenu("about-us") }}><Link style={{ textDecoration: 'none' }} to='/about-us'>About Us</Link>{menu === 'about-us' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("contact-us") }}><Link style={{ textDecoration: 'none' }} to='/contact-us'>Contact Us</Link>{menu === 'contact-us' ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("blog") }}><Link style={{ textDecoration: 'none' }} to='/blog'>Blog</Link>{menu === 'blog' ? <hr /> : <></>}</li>
        </ul>
        <div className='nav-login-cart'>
          {/* <Link to='/login'><button>Login</button></Link> */}
          <Link to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
      </div>
    </>
  )
}

export default Navbar