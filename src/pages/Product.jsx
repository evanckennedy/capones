


import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Product(){
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
              const response = await axios.get('https://fakestoreapi.com/products');
              const product = response.data;

              let randomIndex = getRandomProductNumber(product);
              console.log(randomIndex);
              setProduct(product[randomIndex]);

            } 
           catch (error) {
              console.error('Error, product not found', error);
          }
        };

        getProduct();
      }, []);


    function getRandomProductNumber(product){
      let randomNumber = Math.floor(Math.random() * product.length);
      return randomNumber
    }

    //Creates an Stock Keeping Unit Number from the Product
    function generateSKU(number, title){
      let letters  = (title.slice(0,4)).toUpperCase();
      let number1 = ((number*547).toString()).slice(0,3);
      let number2 = ((number*1483).toString()).slice(0,4);
      let number3 = ((number*2267).toString()).slice(0,3);
      return (`SKU: ${letters}-${number1}-${number2}-${number3}`)
    }


    //Sale, if id is odd
    function sale(number){
      if (number%2==0){
        return true;
      }
      return false;
    }

    function salePrice(price){
      return ((price*0.6).toFixed(2));
    }

    return (
        <div className='container'>
            {product ? (
                <div className='products'>
                  <div className='product-image'>
                    <div className='product-image-box'>
                      <img src={product.image} alt=""/>
                    </div>
                  </div>
                  <div className='product-information'>
                    <h2>{product.title}</h2>
                    {generateSKU(product.id, product.title)}

                    <div className='cost'>
                      {sale(product.id) ? <h2>${product.price}</h2>:
                      <div className='sale'>
                        <h2><span className='strike-through'>${product.price}</span></h2>
                        <h2><span className='red-text sale-price'>${salePrice((product.price))}</span></h2>
                        <h2><span className='red-text save'>Save ${Math.floor(product.price-salePrice(product.price))}</span></h2>
                      </div>
                       }
                    </div>
                    <div className='size-chart'>
                      <h2>Size chart</h2>
                      <button className='size-chart-btn'></button>
                    </div>
                    <div className='sizes'>
                      <div>S</div>
                      <div>M</div>
                      <div>L</div>
                      <div>XL</div>
                    </div>
                    <h2 className='product-colors-title'>COLOR</h2>
                    <div className='product-colors'>
                      <div>
                        <button className='product-white'></button>
                      </div>
                      <div>
                        <button className='product-black'></button>
                      </div>
                      <div>
                        <button className='product-pink'></button>
                      </div>
                    </div>
                    <button className='add-to-cart'>ADD TO CART</button>
                    <p className='product-description'>{product.description}</p>
                  </div>



                  
              
                    
                    
                    
                    
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
};
