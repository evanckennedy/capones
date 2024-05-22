



import React, { useState, useEffect } from 'react';
import searchIcon from "../media/icon-search.png";
import cartIcon from "../media/icon-cart.png";
import signInIcon from "../media/icon-sign-in.png";




export default function Header() {
  const ads = [
    { index: 1, description: "50% OFF MEN'S PULLOVERS" },
    { index: 2, description: "FREE LOCAL SHIPPING" },
    { index: 3, description: "Something Else Here" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const adScroll = () => {
    setCurrentIndex((prevIndex) => (prevIndex === ads.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
      const interval = setInterval(adScroll, 5000);
      return () => clearInterval(interval);
    }, []);

  return (
    <>
      <div className="ad-carousel">
        {ads.map((ad, index) => (
          <div
            key={ad.index}
            className={`ad-item ${index === currentIndex ? 'active' : ''}`}>
            {ad.description}
          </div>
        ))}
      </div>
      <div className='header'>
        <div className='header-main container'>
          <div className='header-buttons'>
            <button className='search-btn'></button>
          </div>
          <h1 className='header-title'>CAPONES</h1>
          <div className='header-buttons'>
            <button className='signin-btn'></button>
            <button className='cart-btn'></button>
          </div>
        </div>
        <div className='header-tags'>
          <h2>NEW ARRIVALS</h2>
          <h2>TRENDING</h2>
          <h2>MEN</h2>
          <h2>WOMEN</h2>
          <h2>ACCESSORIES</h2>
          <h2>SALE</h2>
          <h2>SWEATERS</h2>
        </div>
      </div>
    </>
  );
};
