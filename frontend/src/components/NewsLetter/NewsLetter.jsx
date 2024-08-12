import React from 'react'
import './NewsLetter.scss'

import flr1 from './img/flr1.jpg'
import flr2 from './img/flr2.jpg'
import flr3 from './img/flr3.jpg'
import flr4 from './img/flr4.jpg'
import flr5 from './img/flr5.jpg'
import flr6 from './img/flr6.jpg'

const NewsLetter = () => {
  return (
    <>
    {/* <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder='Your Email id' />
        <button>Subscribe</button>
      </div>
    </div> */}
    
    <div className='home4'>
        <h3>Sign up for the newsletter</h3>
        <h4>Sign up for our mailing list to get latest updates and offers</h4>

        <div className='text'>
          <input type="text" placeholder='Enter your email...'/>
          <button>SUBSCRIBE</button>
        </div>
      </div>
      <div className='home5'>
        <h3>Gallery</h3>
        <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ut labore et dolore</h4>

        <div className='images'>

          <img src={flr1} alt="" />
          <img src={flr2} alt="" />
          <img src={flr3} alt="" />
          <img src={flr4} alt="" />
          <img src={flr5} alt="" />
          <img src={flr6} alt="" />
        </div>
      </div>
    </>
  )
}

export default NewsLetter