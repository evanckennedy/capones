import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductGallery() {
  const [products, setProducts] = useState([]);

  const URL ='https://fakestoreapi.com/products';

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(URL);
        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error(error)
      }
    }

    getProducts();
  }, [])

  return (
    <>
      <div className="product-toolbar flex justify-between">
        <h3>New Collection</h3>
        <div className="custom-select">
          <select className="sort-button" defaultValue="Sort: Best Match">
            <option>Sort: Best Match</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
            <option>Price + Shipping: lowest first</option>
            <option>Price + Shipping: highest first</option>
          </select>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item flex">
          <figure>
            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt="" />
          </figure>
          <div className="grid-product-info flex">
            <p></p>
            <p></p>
            <p></p>
          </div>

        </div>
      </div>
    </>
    
  )
}

export default ProductGallery