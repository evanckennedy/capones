import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ProductGallery() {
  const [products, setProducts] = useState([]);
  // originalProducts is used to store the original order of the products, 
  // so we can reset to this order when 'Sort: Best Match' is selected
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Sort: Best Match')

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
        setOriginalProducts(filteredData);
      } catch (error) {
        console.error(error)
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    let sortedProducts;
    switch(sortOption) {
      case 'Sort: Lowest Price':
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'Sort: Highest Price':
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'Sort: Most Rated':
        sortedProducts = [...products].sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'Sort: Highest Rated':
        sortedProducts = [...products].sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        sortedProducts = originalProducts;
    }
    setProducts(sortedProducts);
  }, [sortOption]);

  return (
    <>
      <div className="product-toolbar flex justify-between">
        <h3>New Collection</h3>
        <div className="custom-select">
          <select className="sort-button" defaultValue="Sort: Best Match" onChange={(e) => setSortOption(e.target.value)}>
            <option>Sort: Best Match</option>
            <option>Sort: Lowest Price</option>
            <option>Sort: Highest Price</option>
            <option>Sort: Most Rated</option>
            <option>Sort: Highest Rated</option>
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