import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;