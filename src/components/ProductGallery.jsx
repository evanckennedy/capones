import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ProductGallery() {
  const [products, setProducts] = useState([]);

  const URL ='https://fakestoreapi.com/products';

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(URL);
        const data = response.data;
        const filteredData = data.filter(product => 
          product.category === "men's clothing" || product.category === "women's clothing"
        )
        filteredData.pop();
        filteredData.shift();
        setProducts(filteredData);

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
            <option>Sort: Lowest Price</option>
            <option>Sort: Highest Price</option>
          </select>
        </div>
      </div>
      <div className="grid-container">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="grid-item flex">
              <figure>
                <img src={product.image} alt={product.title} />
              </figure>
              <div className="grid-product-info flex">
                <p>{product.title}</p>
                <p>{product.category}</p>
                <p>$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}  
      </div>
    </>
    
  )
}

export default ProductGallery