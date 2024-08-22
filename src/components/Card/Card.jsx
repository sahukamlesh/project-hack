import React, { useState } from 'react';
import Modal from '../Modal/Modal'; 

const Card = ({ card }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleconfirmModel = ()=>{
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 w-3/4 mb-4">
      <div className="p-6 flex">
        {/* Left Side */}
        <div className="w-[50%] pr-6 border-r border-gray-300">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-700">
              {card.title}
            </h2>
            <span className="text-sm font-semibold text-green-500 flex items-center">
              {card.status}
              {card.status === 'OPEN' && (
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </span>
          </div>
          <p className="text-gray-700 mt-2">
            {card.description}
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/3 pl-6 justify-center text-left mx-12">
          <p className="text-sm text-gray-600"><span className="font-semibold">Created by:</span> {card.createdBy}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Estimated:</span> {card.estimatedHours} hrs</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Category:</span> {card.category}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Initiative:</span> {card.initiative}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Skills:</span> {card.skills}</p>
          <p className="text-sm text-gray-600 mt-4">
            <span className="font-semibold">Infy Points you can earn:</span> {card.points}
          </p>
          <div className="mt-6">
            <button
              className="w-full bg-gray-800 text-white font-semibold py-2 rounded hover:bg-gray-700"
              onClick={handleApplyClick}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} card={card} setIsModalOpen={setIsModalOpen} onConfirm={handleconfirmModel}/>
    </div>
  );
};

export default Card;
