import HeroBanner from "../components/HeroBanner"
import ProductGallery from "../components/ProductGallery"

function Home() {
  return (
    <>
      <HeroBanner></HeroBanner>
      <div className="container">
        <ProductGallery />
      </div>
      
    </>
  )
}

export default Home