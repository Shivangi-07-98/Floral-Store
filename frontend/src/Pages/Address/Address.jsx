import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './Address.scss';
import axios from 'axios';

const AddressForm = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        addressType: 'home'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/address/addAddress', formData);
            console.log('Form submitted', response.data);
            navigate('/checkout', { state: { totalAmount: getTotalCartAmount() } });
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="locality"
                    placeholder="Locality"
                    value={formData.locality}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <textarea
                    name="address"
                    placeholder="Address (Area and Street)"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <input
                    type="text"
                    name="city"
                    placeholder="City/District/Town"
                    value={formData.city}
                    onChange={handleChange}
                />
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                >
                    <option value="">--Select State--</option>
                    <option value="state1">State 1</option>
                    <option value="state2">State 2</option>
                    <option value="state3">State 3</option>
                    <option value="state4">State 4</option>
                </select>
            </div>
            <div className="form-row">
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={formData.landmark}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="alternatePhone"
                    placeholder="Alternate Phone (Optional)"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                />
            </div>
            <div className="address-type">
                <label>
                    <input
                        type="radio"
                        name="addressType"
                        value="home"
                        checked={formData.addressType === 'home'}
                        onChange={handleChange}
                    />
                    Home (All day delivery)
                </label>
                <label>
                    <input
                        type="radio"
                        name="addressType"
                        value="work"
                        checked={formData.addressType === 'work'}
                        onChange={handleChange}
                    />
                    Work (Delivery between 10 AM - 5 PM)
                </label>
            </div>
            <div className="form-row">
                <button onClick={() => navigate('/checkout', { state: { totalAmount: getTotalCartAmount() } })} type="submit" className="save-button" >
                    SAVE AND DELIVER HERE
                </button>
                <button type="button" className="cancel-button" onClick={() => console.log('Cancel')}>
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default AddressForm;


<button onClick={() => navigate('/delivery-address', { state: { totalAmount: getTotalCartAmount() } })}>
            PROCEED TO CHECKOUT
          </button>