import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  isAuth: boolean;
  redirectTo: string;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAuth, redirectTo }) => {
  return isAuth ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
