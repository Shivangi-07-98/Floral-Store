import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { totalAmount } = location.state || { totalAmount: 0 }; // Default to 0 if not provided
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(totalAmount);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAmount(totalAmount); // Update amount when totalAmount changes
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    setIsLoading(true);

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      console.error(error);
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/payment/', {
        token,
        amount,
        email,
      });

      navigate('/Payment', { state: { email, amount } });
      setMessage('Payment SuccessFully.');
    } catch (error) {
      console.error(error);
      setMessage('Payment Failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-section">
      <div className="checkout-card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="email_field" className="input_label">Card holder email</label>
              <input
                id="email_field"
                className="input_field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="amount_field" className="input_label">Amount</label>
              <input
                id="amount_field"
                className="input_field"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                readOnly
              />
            </div>
            <div className="input_container">
              <label className="input_label">Card Number</label>
              <div className="stripe-input">
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="input_container split">
              <div className="split_input">
                <label className="input_label">Expiry Date</label>
                <div className="stripe-input">
                  <CardExpiryElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="split_input">
                <label className="input_label">CVC</label>
                <div className="stripe-input">
                  <CardCvcElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button className="purchase--btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Make Payment'}
          </button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
