import { FaRegTrashCan } from "react-icons/fa6";
import clothSample from "../media/clothSample.webp";

export default function Cart() {
  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Bag</h1>
      <h2 className="cart-subtitle">3 items</h2>
      <div className="cart-checkout-section">
        <div className="cart-item">
          <img src={clothSample} alt="product-img" className="cart-item-img" />
          <table className="cart-items-table">
            <thead>
              <tr className="first-row">
                <th>Rain Jacket Women Windbreaker Striped</th>
                <th>Each</th>
                <th>Quantity</th>
                <th>Total</th>
                <th><FaRegTrashCan /></th>
              </tr>
            </thead>
            <tbody>
              <tr className="second-row">
                <td>XS | WHITE</td>
                <td>$23.99</td>
                <td>
                  <select className="quantity-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </td>
                <td>$23.99</td>
              </tr>
              <tr className="third-row">
                <td>UPC: 29436937</td>
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
      </div>
      
    </div>
    
  )
}





