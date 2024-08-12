import React, { useContext ,useState} from 'react'
import './ProductDisplay.scss'
import {Link} from 'react-router-dom'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = (productId) => {
    addToCart(productId);
    setIsAdded(true);
};
  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-stars'>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-price-old'>${product.old_price}</div>
          <div className='productdisplay-right-price-new'>${product.new_price}</div>
        </div>
        <div className='productdisplay-right-description'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, dolores, itaque incidunt ad fugiat optio sequi quasi eveniet corrupti veniam laboriosam? Labore eligendi consectetur qui dolorum, aspernatur maiores molestias facere.
        </div>
        <div className='productdisplay-right-size'>
          {/* <h1>Select Size</h1> */}

          {/* <div className='productdisplay-right-sizes'>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div> */}

        </div>
        <div>
            {!isAdded ? (
                <button style={{ marginTop: '2rem' }} onClick={() => handleAddToCart(product.id)}>
                    ADD TO CART
                </button>
            ) : (
                <Link to="/cart">
                    <button style={{ marginTop: '2rem' }}>
                        GO TO CART
                    </button>
                </Link>
            )}
        </div>
        <p className='Productdisplay-right-category'><span>Category: </span>Women, T-shirt, Crop Top</p>
        <p className='Productdisplay-right-category'><span>Tags: </span>Modern, Latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay