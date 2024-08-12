import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.scss';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { allProducts, cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext);
  const {getTotalCartAmount}=useContext(ShopContext)
console.log("allProducts",getTotalCartAmount);

  const navigate = useNavigate();
  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />


      {allProducts.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>


                <div className='cartitems-quantity'>
                  <button className='update' onClick={() => decreaseQuantity(e.id)}>-</button>
                  <span className='inside'>{cartItems[e.id]}</span>
                  <button className='update' onClick={() => increaseQuantity(e.id)}>+</button>
                </div>


                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}



      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate('/delivery-address', { state: { totalAmount: getTotalCartAmount() } })}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className='cartitems-promocode'>
          <p>If you have a promo code, Enter it here</p>
          <div className='cartitems-promobox'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItems;
