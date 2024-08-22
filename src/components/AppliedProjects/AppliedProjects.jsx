import React, { forwardRef, useState } from "react";

const AppliedProject = forwardRef(({ onClose, appliedRoles,card }, ref) => {
  return (
    <div className="flex justify-center items-center h-68" ref={ref}>
      <div className="relative text-center bg-gray-100 p-6 rounded-lg shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-blue-700">Appled Project</h2>
        {appliedRoles.length > 0 ? (
          appliedRoles.map((role) => (
            <div key={role.id} className="flex flex-col p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
            </div>
          ))
        ) : (
          <p>No applied projects</p>
        )}
      </div>
    </div>
  );
});

export default AppliedProject;
