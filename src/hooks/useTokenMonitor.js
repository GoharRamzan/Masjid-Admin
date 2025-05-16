// src/hooks/useTokenMonitor.js
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useTokenMonitor = () => {
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          window.dispatchEvent(new Event('tokenExpired'));
        }
      } catch {
        window.dispatchEvent(new Event('tokenExpired'));
      }
    };

    const interval = setInterval(checkToken, 5000);  

    return () => clearInterval(interval);
  }, []);
};

export default useTokenMonitor;
