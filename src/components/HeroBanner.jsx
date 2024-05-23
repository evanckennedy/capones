

import { useNavigate } from 'react-router-dom';


function HeroBanner() {


  const navigate = useNavigate();
  function redirect(location) {
    navigate(`/${location}`);
  };
  

  return (
    <div className="hero-banner">
      <h2 className="hero-banner-text">PRE-FALL 2024</h2>
      <button onClick={() => redirect('')}>Shop now</button>

    </div>
  )
}

export default HeroBanner