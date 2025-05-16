import React, { useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  const expired = useMemo(() => {
    return !token || isTokenExpired(token);
  }, [token]);

  useEffect(() => {
    if (expired && token) {
      window.dispatchEvent(new Event('tokenExpired')); // 🔥 show modal
    }
  }, [expired, token]);

  if (expired) {
    return <Navigate to="/login" replace /> ; // 👈 don't show protected content
  }

  return children;
};

export default PrivateRoute;
