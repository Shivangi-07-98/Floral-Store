import React from 'react';
import { FaUser, FaEnvelope, FaRegCommentDots } from 'react-icons/fa';
import './CSS/ContactUs.scss';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">
            <FaUser /> Name
          </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email
          </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">
            <FaRegCommentDots /> Message
          </label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
