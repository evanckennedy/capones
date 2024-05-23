import { FaRegTrashCan } from "react-icons/fa6";

import { useEffect, useState } from 'react';
import axios from 'axios';
import AmericanExpress from "../media/amex.png";
import ApplePay from "../media/applepay.png";
import Visa from "../media/visa.png";
import Master from "../media/mastercard.png";

export default function Cart() {

  const [cartProducts, setCartProducts] = useState([]);
  const [cartsTotalPrice, setCartTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const URL ='https://fakestoreapi.com/products';

  useEffect(() => {
    async function getCartProducts() {
      try {
        const response = await axios.get(URL);
        const data = response.data;
        const filteredData = data.filter(product => 
          product.category === "men's clothing" || product.category === "women's clothing"
        )
        filteredData.pop();
        filteredData.shift();
        const updatedQuantityList = filteredData.map(product => {
          initializeProductQuantity(product);
		      updateProductTotalPrice(product);
          return product;
	      }
        );
        setCartProducts(updatedQuantityList);
        updateCartTotal(updatedQuantityList);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    }

    getCartProducts();
  }, []);

  const updateProductTotalPrice = (product) => {
    product.totalPrice = product.quantity * product.price;
  }

  const initializeProductQuantity = (product) => {
    product.quantity = 1;
  }

  const updateCartTotal = (cartItemsList) => {
    const totalCost = cartItemsList.reduce((sum, product) =>
      sum + product.totalPrice, 0);
    setCartTotalPrice(totalCost.toFixed(2));
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartProducts = cartProducts.map(product => {
      if (product.id === productId) {
        product.quantity = newQuantity;
        updateProductTotalPrice(product)
      }
      return product;
    });
    setCartProducts(updatedCartProducts);
    updateCartTotal(updatedCartProducts);
  };
  
  const handleRemoveItem = (productId) => {
    const updatedCartProducts = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedCartProducts);
    updateCartTotal(updatedCartProducts);
  };

  return (
    <div className="container">
      <h2 className="cart-shopping-bag">Shopping Bag</h2>
      <h2 className="cart-subtitle">{cartProducts.length} items</h2>
      <div className="cart-container">
        <div></div>
   
        <div className="cart-sections">
          <div className={`cart-checkout-section ${isLoading ? 'shimmer' : ''}`}>
            {
              cartProducts.map((product) => 
                <div className="cart-item">
                  <div className="cart-picture-box">
                    <img src={product.image} alt="Product Image" className="cart-item-img" />
                  </div>
                  <div className="cart-info-box">
                    <h2 className="cart-title">{product.title}</h2>
                    <h2 class="cart-text">SKU</h2>
                    <h2 class="cart-text">In Stock</h2>
                    <h2><span className="edit underline-edit">Edit</span></h2>
                  </div>
                  <div className='cart-each-box cart-box'>
                    <h2 className="cart-title">Each</h2>
                    <h2 className="cart-text">${product.price}</h2>
                  </div>
                  <div className="cart-quantity-box cart-box">
                    <h2 className="cart-title">Quantity</h2>
                    <select 
                      className="quantity-select"
                      value={product.quantity} 
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="cart-total cart-box">
                    <h2 className="cart-title">Total</h2>
                    <h2 className='cart-total-price'>{product.totalPrice}</h2>
                  </div>
                  <div className="cart-trash-box">
                    <FaRegTrashCan className='trash-icon' onClick={() => handleRemoveItem(product.id)}/>
                  </div>
                  <div>
                </div>
              </div>
              )
            }
          </div>
      <div className="checkout-section">
          <div className="discounts">
            <p>Discounts</p>
            <p className="underline">Apply discount</p>
          </div>
          <p>Log in to use your personal offers!</p>
          <button className="signin-btn">Sign In</button>
          <div className="order-details">
            <div className="order-item">
              <span className="order-service">Order value</span>
              <span className="order-value">${cartsTotalPrice}</span>
            </div>
            <div className="order-item">
              <span className="order-service">Delivery</span>
              <span className="order-value">FREE</span>
            </div>
            <div className="divide-line"></div>
            <div className="order-item">
              <span className="order-service bold-text-total">Total</span>
              <span className="order-value bold-text-total">${cartsTotalPrice}</span>
            </div>
          </div>
          <div>
          <p className="sale-description">*Sale items are final & cannot be returned.</p>
          <p className="sale-description">*Item prices exclude tax</p>
          </div>
          <button className="checkOut-btn">Checkout</button>
          <p className="sale-description">We accept</p>
          <div className="div-cards-img">
            <img className="card-img" src={AmericanExpress} alt="American Express" />
            <img className="card-img" src={ApplePay} alt="Apple Pay" />
            <img className="card-img" src={Visa} alt="Visa Card" />
            <img className="card-img" src={Master} alt="Master Card" />
          </div>
          <p className="checkout-bottom-text">Prices and shipping costs are not confirmed until you've reached checkout</p>
          <p className="checkout-bottom-text">30-day returns. Read more about our <span className="returnPolicy underline">return and refund policy.</span></p>
        </div>
        </div>
      </div>
     </div>
  )
}






