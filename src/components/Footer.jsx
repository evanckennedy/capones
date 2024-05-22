



import React, { useState, useEffect } from 'react';
import paymentImage from "../media/payments.png";
export default function Footer() {
  
  return (
    <>
      <div className='footer-divider'></div>
      <div className='footer container'>
        <div className='footer-box'>
          <div className='footer-customer-support'>
            <h2>CUSTOMER SUPPORT</h2>
            <ul>
              <li>Contact Us</li>
              <li>In-Store Gift Card Balance</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className='footer-orders-returns'>
            <h2>ORDERS & RETURNS</h2>
            <ul>
              <li>My Account</li>
              <li>OrderTracking</li>
              <li>But E-Gift Card</li>
              <li>Shipping Information</li>
              <li>Returns and Exchanges</li>
            </ul>

          </div>
          {/* <div className='footer-company-info'>
            <h2>COMPANY INFO</h2>
            <ul>
              <li>Store Locator</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Accessibility</li>
            </ul>
          </div> */}
          <div className='footer-signup-emails'>
            <h2>SIGN UP FOR EMAILS & GET 10% OFF!</h2>
            <input type='text' placeholder='Enter your email'></input>
          </div>
        </div>
        <div className='footer-language-select'>
          <select name="language-select">
            <option>English</option>
            <option>French</option>
            <option>Swahili</option>
          </select>
        </div>
        <div className='footer-payment-options'>
          <img src={paymentImage}></img>
        </div>
        <div className='footer-copywrite'>
          <p>&copy; CAPONES All rights reserved</p>
        </div>
      </div>
    </>
  );
};
