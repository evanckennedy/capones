function ProductGallery() {
  return (
    <>
      <div className="product-toolbar flex justify-between">
        <h3>New Collection</h3>
        <div className="custom-select">
          <select className="sort-button">
            <option disabled selected>Sort: Best Match</option>
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