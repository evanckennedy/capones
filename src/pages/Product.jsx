import React, { useEffect, useState } from 'react';
import axios from 'axios';
import star from '../media/icon-star.png';
import { useParams, useNavigate } from 'react-router-dom';

export default function Product() {
  const [product, setProduct] = useState(null);
  const [imageClass, setImageClass] = useState('');
  const [addToCart, setAddToCart] = useState('add-to-cart');
  let { slug } = useParams();
  const navigate = useNavigate();

  const URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    if (isNaN(slug)) {
      navigate('*');
    } else {
      const getProduct = async () => {
        try {
          const response = await axios.get(URL);
          const data = response.data;
          /* const product = fliterClothing(data); */
          const productFound = data.find(product => product.id == slug);
          /* console.log(productFound); */
          setProduct(productFound);
        } catch (error) {
          console.error('Error, product not found', error);
        }
      };

      getProduct();
    }
  }, [slug, navigate]);

  /* function fliterClothing(products) {
    return products.filter(product =>
      product.category === "men's clothing" || product.category === "women's clothing"
    );
  } */

  function generateSKU(number, title) {
    let letters = (title.slice(0, 4)).toUpperCase().trim();
    let number1 = ((number * 547).toString()).slice(0, 3);
    let number2 = ((number * 1483).toString()).slice(0, 4);
    let number3 = ((number * 2267).toString()).slice(0, 3);
    return (`SKU: ${letters}-${number1}-${number2}-${number3}`);
  }

  function sale(number) {
    return number % 2 === 0;
  }

  function salePrice(price) {
    return ((price * 0.6).toFixed(2));
  }

  function colorChange(colorClass) {
    setImageClass(colorClass);
  }

  function outOfStock() {
    setAddToCart('inactive-btn');
  }

  function inStock() {
    setAddToCart('add-to-cart');
  }

  return (
    <div className='container'>
      {product ? (
        <div className='products'>
          <div className='product-image'>
            <div className='product-image-box'>
              <img src={product.image} alt="" className={imageClass} />
            </div>
          </div>
          <div className='product-information'>
            <h2>{product.title}</h2>
            {generateSKU(product.id, product.title)}
            <div className='product-rating'>
              <img src={star}></img>
              <h2>{product.rating.rate}</h2>
              <h2>({product.rating.count} ratings)</h2>
            </div>
            <div className='cost'>
              {sale(product.id) ? <h2 className='not-on-sale'>${product.price}</h2> :
                <div className='sale'>
                  <h2><span className='strike-through sale-small-text'>${product.price}</span></h2>
                  <h2><span className='red-text sale-price'>${salePrice((product.price))}</span></h2>
                  <h2><span className='red-text save sale-small-text'>Save ${Math.floor(product.price - salePrice(product.price))}</span></h2>
                </div>
              }
            </div>
            <div className='size-chart'>
              <h2>Size chart</h2>
              <button className='size-chart-btn'></button>
            </div>
            <div className='sizes'>
              <div onClick={() => inStock()}>XS</div>
              <div onClick={() => inStock()}>S</div>
              <div onClick={() => inStock()}>M</div>
              <div onClick={() => inStock()}>L</div>
              <div onClick={() => outOfStock()}>XL</div>
            </div>
            <h2 className='product-colors-title'>COLOR</h2>
            <div className='product-colors'>
              <div>
                <button className='product-white' onClick={() => colorChange('white-image')}></button>
              </div>
              <div>
                <button className='product-black' onClick={() => colorChange('black-image')}></button>
              </div>
              <div>
                <button className='product-pink' onClick={() => colorChange('pink-image')}></button>
              </div>
              <div>
                <button className='product-green' onClick={() => colorChange('green-image')}></button>
              </div>
              <div>
                <button className='product-blue' onClick={() => colorChange('blue-image')}></button>
              </div>
            </div>
            <div className='quantity'>
              <h2>QUANTITY</h2>
              <select className="quantity-select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button className={addToCart}>ADD TO CART</button>
            <p className='product-description'>{product.description}</p>
          </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
