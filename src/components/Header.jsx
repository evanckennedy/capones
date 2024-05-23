import { useState, useEffect } from 'react';
import searchIcon from "../media/icon-search.png";
import cartIcon from "../media/icon-cart.png";
import signInIcon from "../media/icon-sign-in.png";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const ads = [
    { index: 1, description: "50% OFF MEN'S PULLOVERS" },
    { index: 2, description: "FREE LOCAL SHIPPING" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModal] = useState(false);
  const [searchOpen, setSearch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function redirect(location) {
      navigate(`/${location}`);
  };

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  };

  function closeSearch() {
    setSearch(false);
  }

  function openSearch() {
    setSearch(true);
  };

  const adScroll = () => {
    setCurrentIndex((prevIndex) => (prevIndex === ads.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
      const interval = setInterval(adScroll, 5000);
      return () => clearInterval(interval);
    }, []);

  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || password === '') {
      setErrorMessage('Invalid email or password')
    } else {
      setErrorMessage('');
    }
  }

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
          {!searchOpen && <button onClick={openSearch} className='search-btn'></button>}
            {searchOpen && (
                <>
                <div className='transparent-layer' onClick={closeSearch}></div>
                <button className='search-btn'></button>
                <div className='search-bar-modal'>
                  <div className='container search-box'>
                    <div className='search-components'>
                      <button className='search-btn search-white-bg'></button>
                      <input type='text' className='search-input' placeholder='Search our store'></input>
                    </div>
                  <button onClick={closeSearch} className='close-search'></button>
                  </div>
                </div>
                
                </>)}
    
            
          </div>
          <h1 className='header-title' onClick={() => redirect('')}>CAPONES</h1>
          <div className='header-buttons cart-login-box'>
            {/* <button className='signin-btn'></button> */}
            {!modalOpen && <button onClick={openModal} className='open-modal'></button>}
              {modalOpen && (
              <>
              <div className='transparent-layer' onClick={closeModal}></div>
              <button className='open-modal'></button>
              <div className="modal">
                <button onClick={closeModal} className='close-modal'></button>
                <h2>Login</h2>
                <p>EMAIL</p>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                <div className='modal-password-section'>
                  <p>PASSWORD</p>
                </div>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className='pointer-text'>Forgot password?</p>
                <button className='modal-signin-btn' onClick={validateForm}>SIGN IN</button>
                <p className='error message'>{errorMessage}</p>
                <p className='pointer-text'>Create account</p>
              </div>
              </>)}
            <button className='cart-btn' onClick={() => redirect('cart')} ></button>
          </div>



        </div>
        <div className='header-tags'>
        <div className='dropdown'>
            <h2>NEW ARRIVALS</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Just in Time for Spring</li>
                <li>New Styles</li>
                <li>Lightly Fire Damaged</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>TRENDING</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Most Popular</li>
                <li>Best Sellers</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>MEN</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Pants</li>
                <li>Shirts</li>
                <li>Shoes</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>WOMEN</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Pants</li>
                <li>Shirts</li>
                <li>Blouses</li>
                <li>Dresses</li>
                <li>Shoes</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>ACCESSORIES</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Hats</li>
                <li>Scarves</li>
                <li>Sun Glasses</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>SALE</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Hot Deals</li>
                <li>Going Fast</li>
                <li>2023 Fashion</li>
              </ul>
            </div>
          </div>
          <div className='dropdown'>
            <h2>SWEATERS</h2>
            <div className='dropdown-items'>
              <ul>
                <li>Pullovers</li>
                <li>Hoodies</li>
                <li>Ponchos</li>
                <li>Mumus</li>
                <li>Capes</li>
                <li>Jumpsuits</li>
                <li>Unisheets</li>
                <li>Muslin Body Rolls</li>
                <li>Academic and Judical Robes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
