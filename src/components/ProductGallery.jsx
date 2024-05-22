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
    </>
    
  )
}

export default ProductGallery