import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="grid-item flex">
        <figure>
          <img src={product.image} alt={product.title} className='gallery-image' />
        </figure>
        <div className="grid-product-info flex">
          <p>{product.title}</p>
          <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem;