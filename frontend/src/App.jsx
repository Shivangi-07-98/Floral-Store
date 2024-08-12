import React from 'react'
import Navbar from './components/Navbar/Navbar'
// import Routing from './Routing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageNotFound from './components/PageNotFound/PageNotFound';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './components/Footer/Footer';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Blog from './Pages/Blog';
import EventConsultation from './Pages/EventConsultation';
import EventGallery from './Pages/EventGallery';
import Subscription from './Pages/Subscription';
import CustomArrangement from './Pages/CustomArrangement';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import men_banner from './components/Assets/banner_women.jpg'
import women_banner from './components/Assets/banner_kids.jpg'
import kid_banner from './components/Assets/banner_women.jpg'
import Checkout from './Pages/payment/checkout';
import Address from './Pages/Address/Address';

const stripePromise = loadStripe('pk_test_51PQNMC08tfQw2xpzXlVSeOg5KXYlP2QF2vT5wNwsZ2vztSyNlI431IZ7nwlvQvxH0uCutXAXTX6tFhZtQdnyQDec00GzBepj6v');
function App() {
  return (
    <div>
      {/* <Routing/> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path='/mothers-day' element={<ShopCategory banner={men_banner} category='mothers-day' names="Mother's Day"/>} />
          <Route path='/anniversary' element={<ShopCategory banner={women_banner} category='anniversary' names="Anniversary"/>} />
          <Route path='/birthday' element={<ShopCategory banner={kid_banner} category='birthday' names="Birthday"/>} />
          <Route path='/congrats' element={<ShopCategory banner={kid_banner} category='congrats' names="Congrats"/>} />
          <Route path='/get-well' element={<ShopCategory banner={kid_banner} category='get-well' names="Get Well"/>} />
          <Route path='/graduation' element={<ShopCategory banner={kid_banner} category='graduation' names="Graduation"/>} />
          <Route path='/i-am-sorry' element={<ShopCategory banner={kid_banner} category='i-am-sorry' names="I Am Sorry"/>} />
          <Route path='/just-because' element={<ShopCategory banner={kid_banner} category='just-because' names="Just Because"/>} />
          <Route path='/love-romance' element={<ShopCategory banner={kid_banner} category='love-romance' names="Love Romance"/>} />
          <Route path='/new-baby' element={<ShopCategory banner={kid_banner} category='new-baby' names="New Baby"/>} />
          <Route path='/spring' element={<ShopCategory banner={kid_banner} category='spring' names="Spring"/>} />
          <Route path='/sympathy-funeral' element={<ShopCategory banner={kid_banner} category='sympathy-funeral' names="Sympathy Funeral"/>} />
          <Route path='/thankyou' element={<ShopCategory banner={kid_banner} category='thankyou' names="Thankyou"/>} />
          <Route path='/wedding' element={<ShopCategory banner={kid_banner} category='wedding' names="Wedding"/>} />

          {/* <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route> */}
           <Route path="/product/:productId" element={<Product />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/custom-arrangement' element={<CustomArrangement />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/event-consultation' element={<EventConsultation />} />
          <Route path='/event-gallery' element={<EventGallery />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/delivery-address' element={<Address/>}></Route>
          <Route path="/checkout" element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App