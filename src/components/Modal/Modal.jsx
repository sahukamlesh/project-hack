import React from 'react';

const Modal = ({ isOpen, onClose, card,setIsModalOpen,onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-[90%] max-w-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Work Details</h2>
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Work Title:</span> {card.title}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Estimated Hours to Complete:</span> {card.estimatedHours} hrs
          </p>
          <p className="mb-2">
            <span className="font-semibold">Work Category:</span> {card.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Skills:</span> {card.skills}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Infy Points:</span> {card.points}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
          <button className="ml-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={onConfirm}>
            Confirm & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
