import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useSelector(selectAuth);
  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
