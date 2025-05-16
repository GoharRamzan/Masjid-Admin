// src/components/TokenExpiredModal.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenExpiredModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleExpire = () => setShow(true);
    window.addEventListener('tokenExpired', handleExpire);
    return () => window.removeEventListener('tokenExpired', handleExpire);
  }, []);

  const handleOK = () => {
    localStorage.clear();
    setShow(false);
    navigate('/login');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-bold mb-2">Session Expired</h2>
        <p className="mb-4">Your login session has expired. Please log in again.</p>
        <button onClick={handleOK} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          OK
        </button>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
