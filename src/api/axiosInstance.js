import axios from 'axios';

const API = axios.create({
  baseURL: 'https://masjid-screen-phi.vercel.app/api', // ✅ match with your backend
  // baseURL: 'http://localhost:5000/api', // ✅ match with your backend
});

// Request: Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: Handle token expiration globally
API.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest?.url !== '/auth/login'
    ) {
      window.dispatchEvent(new Event('tokenExpired')); // 🔔 trigger modal
    }
    return Promise.reject(error);
  }
);

export default API;
