import { FaRegTrashCan } from "react-icons/fa6";
import CartProduct from "../utils/CartProduct";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {

  const [cartProducts, setCartProducts] = useState([]);
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
        console.log(
          filteredCartItems
        );
      } catch (error) {
        console.error(error)
      }
    }

    getCartProducts();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartProducts = cartProducts.map(product => {
      if (product.id === productId) {
        product.updateQuantity(newQuantity);
      }
      return product;
    });
    setCartProducts(updatedCartProducts);
  };
  
  const handleRemoveItem = (productId) => {
    const updatedCartProducts = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedCartProducts);
  };


  return (
    <div className="container">
    <div className="cart-container">
      <h1 className="cart-title">Shopping Bag</h1>
      <h2 className="cart-subtitle">{cartProducts.length} items</h2>
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
                <tr className="second-row">
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
                <tr className="third-row">
                  <td>UPC: { product.upc }</td>
                </tr>
                <tr className="fourth-row">
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
      
    </div>
    </div>
  )
}





