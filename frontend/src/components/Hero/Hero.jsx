import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.scss'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.jpg'

import banner1 from './img/banner1.jpg'
import banner2 from './img/banner2.jpg'

const Hero = () => {
  return (
    <>
    {/* <div className='hero'>
      <div className='hero-left'>
        <h2>NEW ARRIVALS ONLY</h2>
         <div>
          <div className='hero-hand-icon'>
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
         </div>
         <div className='hero-latest-btn'>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
         </div>
      </div>
      <div className='hero-right'>
        <img src={hero_image} alt="" />
      </div>
    </div> */}
    
    <div className='hero1'>
        <div className='left'>
          <div className='text1'>ACCESSORIES</div>
          <h2>Floral <span>Headband</span></h2>
          <p>when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining.</p>
            <Link to="/mothers-day"><button>SHOP NOW</button></Link>
          
        </div>
        <div className='right'></div>
      </div>

      
      {/* <div className='hero2'>
        <div className='box'>
        
          <div className='one'>
            <h4>Flowers for the</h4>
            <h3>Birthday & Gifts</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <Link to='/birthday'><button>SHOP NOW</button></Link>
          </div>
          <div className='two'><img src={banner1} alt="" /></div>
        
        <div className='three'><img src={banner2} alt="" /></div>
          <div className='four'>
          <h4>Flowers for the</h4>
            <h3>WEDDING DAY</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <Link to='/wedding'><button>SHOP NOW</button></Link>
          </div>
          
        
        </div>
      </div> */}

      
    </>
  )
}

export default Hero