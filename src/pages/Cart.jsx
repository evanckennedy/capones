import { FaRegTrashCan } from "react-icons/fa6";
import CartProduct from "../utils/CartProduct";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AmericanExpress from "../media/amex.png";
import ApplePay from "../media/applepay.png";
import Visa from "../media/visa.png";
import Master from "../media/mastercard.png";

export default function Cart() {

  const [cartProducts, setCartProducts] = useState([]);
  const [cartsTotalPrice, setCartTotalPrice] = useState(0);
  const numberOfCartItems = 4;

  const URL ='https://fakestoreapi.com/products';
  useEffect(() => {
    async function getCartProducts() {
      try {
        const response = await axios.get(URL);
        const data = response.data;
        console.log(
          data
        );
        const cartProductList = data.map(product => 
          new CartProduct(product.id, product.title, product.price, product.image, 1)
        )
        const filteredCartItems = cartProductList.slice(0,numberOfCartItems);
        setCartProducts(filteredCartItems);
        updateCartTotal(filteredCartItems);
        console.log(
          filteredCartItems
        );
      } catch (error) {
        console.error(error)
      }
    }

    getCartProducts();
  }, []);

  const updateCartTotal = (cartItemsList) => {
    const totalCost = cartItemsList.reduce((sum, product) =>
      sum + product.totalPrice, 0);
    setCartTotalPrice(totalCost.toFixed(2));
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartProducts = cartProducts.map(product => {
      if (product.id === productId) {
        product.updateQuantity(newQuantity);
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
    <div className="cart-container">
      <h1 className="cart-title">Shopping Bag</h1>
      <h2 className="cart-subtitle">{cartProducts.length} items</h2>
      <div className="cart-sections">
      <div className="cart-checkout-section">
        {
          cartProducts.map( (product) => 
            <div className="cart-item">
            <img src={product.image} alt="Product Image" className="cart-item-img" />
            <table className="cart-items-table">
              <thead>
                <tr className="first-row">
                  <th className="first-row-header">{ product.title }</th>
                  <th>Each</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th><FaRegTrashCan onClick={() => handleRemoveItem(product.id)}/></th>
                </tr>
              </thead>
              <tbody>
                <tr className="second-row narrow-row">
                  <td>{ product.size } | { product.color }</td>
                  <td>$ { product.price }</td>
                  <td>
                    <select 
                    className="quantity-select"
                    value={product.quantity} 
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>
                  <td>${ product.totalPrice } </td>
                </tr>
                <tr className="third-row narrow-row">
                  <td>UPC: { product.upc }</td>
                </tr>
                <tr className="fourth-row narrow-row">
                  <td>In Stock</td>
                </tr >
                <tr className="fifth-row">
                  <td><span className="edit">Edit</span></td>
                </tr>
              </tbody>      
            </table>
          </div>
          )
        }
      </div>
      <div className="checkout-section">
        <div className="discounts">
          <p>Discounts</p>
          <p class="underline">Apply discount</p>
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





