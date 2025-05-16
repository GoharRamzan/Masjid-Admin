import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();     
    navigate('/login');           
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 mt-auto bg-red-600 hover:bg-red-700 text-white px-17 py-2 rounded-md transition duration-300"
    >
      <FaSignOutAlt />
      Logout
    </button>
  );
};

export default LogoutButton;
