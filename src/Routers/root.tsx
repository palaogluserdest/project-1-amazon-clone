import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import ProductDetailPage from '../pages/ProductDetail';
import Register from '../pages/Register';

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Root;
