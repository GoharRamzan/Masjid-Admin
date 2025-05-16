import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg  shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-full max-w-md p-6 relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 font-bold text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
