import React, { useEffect, useState } from 'react';
import axios from 'axios';
import star from '../media/icon-star.png';
import { useParams, useNavigate } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

export default function Product() {
  const [product, setProduct] = useState(null);
  const [imageClass, setImageClass] = useState('');
  const [addToCart, setAddToCart] = useState('add-to-cart');
  const [buttonActive, setButtonActive] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeSize, setActiveSize] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [clickedColor, setClickedColor] = useState('');

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
          const productFound = data.find(product => product.id == slug);
          setProduct(productFound);

          const filteredData = data.filter(
            product =>
              product.category === "men's clothing" || product.category === "women's clothing"
          );
          const removeChosenProduct = filteredData.filter(product => product.id != slug);
          const fourProducts = removeChosenProduct.slice(1, 5);
          setFilteredProducts(fourProducts);
        } catch (error) {
          console.error('Error, product not found', error);
        }
      };

      getProduct();
    }
  }, [slug, navigate]);

  function generateSKU(number, title) {
    let letters = title.slice(0, 4).toUpperCase().trim();
    let number1 = (number * 547).toString().slice(0, 3);
    let number2 = (number * 1483).toString().slice(0, 4);
    let number3 = (number * 2267).toString().slice(0, 3);
    return `SKU: ${letters}-${number1}-${number2}-${number3}`;
  }

  function sale(number) {
    return number % 2 === 0;
  }

  function salePrice(price) {
    return (price * 0.6).toFixed(2);
  }

  function colorChange(colorClass) {
    setImageClass(colorClass);
  }

  function inStock() {
    setAddToCart('add-to-cart');
    setButtonActive(true);
    setImageClass('');
  }

  function handleSizeClick(size) {
    setActiveSize(size);
    if (size === 'XL') {
      outOfStock();
    } else {
      inStock();
    }
  }

  return (
    <div className='container'>
      {product && (
        <div className='products'>
          <div className='product-image'>
            <div className='product-image-box'>
              <img src={product.image} alt="" className={imageClass} />
            </div>
          </div>
          <div className='product-information'>
            <div className="product-title-n-rating">
              <h2 className='product-title'>{product.title}</h2>
              <div className='product-rating'>
                <img src={star} alt="star" />
                <h2>{product.rating.rate}</h2>
                <h2>({product.rating.count} ratings)</h2>
              </div>
            </div>
            <div className='cost'>
              ${product.price}
            </div>
            <div className="size-wrapper">
              <div className='size-chart'>
                <h2>SIZE</h2>
              </div>
              <div className='sizes'>
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <div
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={activeSize === size ? 'size-button-active' : 'size-button-inactive'}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className='product-colors-title'>COLOR</h2>
              <div className='product-colors'>
                {['white-image', 'black-image', 'pink-image', 'green-image', 'blue-image'].map(color => (
                  <div className={`color-btn-bg ${clickedColor === color ? 'color-clicked' : ''}`} key={color} onClick={() => setClickedColor(color)}>
                    <button className={`color-btn-${color}`}></button>
                  </div>
                ))}
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
            <button className={addToCart}>ADD TO BAG</button>
          </div>
        </div>
      )}
      <div className="you-may-also-like flex gap-20">
        <h3>You May Also Like</h3>
        <div className="grid-container">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
