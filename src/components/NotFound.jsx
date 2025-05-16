import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center text-green-800">
        <h1 className="text-5xl font-extrabold mb-4 border-b-2 border-green-500 pb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="inline-block mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
