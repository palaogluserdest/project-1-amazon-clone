import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import ProductDetailPage from '../pages/ProductDetail';
import Register from '../pages/Register';
import { UserProps } from '../types/types';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { getUserFromFS } from '../utils/user';
import ProtectedRoute from './ProtectedRoute';

const Root = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchUser = await getUserFromFS(user.uid);
        setUserData(fetchUser);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuth={!userData?.isAuth} redirectTo="/login">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuth={userData?.isAuth} redirectTo="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAuth={userData?.isAuth} redirectTo="/">
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default Root;
