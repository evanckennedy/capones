import { useLocation, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  const isProductPath = /^\/product\/\d+$/.test(location.pathname);
  const isNotFound = !(
    location.pathname === '/' ||
    isProductPath ||
    location.pathname === '/cart'
  );

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/product/:slug', element: <Product /> },
    { path: '/cart', element: <Cart /> },
    { path: '*', element: <NotFound /> }
  ]);

  return (
    <>
      {!isNotFound && <Header />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {routes}
        </motion.div>
      </AnimatePresence>
      {!isNotFound && <Footer />}
    </>
  );
}

export default App;