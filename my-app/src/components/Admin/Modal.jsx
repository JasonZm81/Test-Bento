import React from 'react';

const Modal = ({ isOpen, onClose, message, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-4">Product Information</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">{message}</p>
        {children}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 