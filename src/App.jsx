import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const isNotFound = !['/', '/product/:slug', '/cart'].includes(location.pathname);

  return (
    <>
      {!isNotFound && <Header />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:slug' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  );
}

export default App;