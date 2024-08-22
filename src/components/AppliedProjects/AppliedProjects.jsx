import React, { forwardRef } from 'react'

const AppliedProject = forwardRef(({ onClose, appliedRoles }, ref) => {
  return (
    <div className="flex justify-center items-center h-68" ref={ref}>
      <div className="relative text-center bg-gray-100 p-6 rounded-lg shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-blue-700">Applied Projects</h2>
        {appliedRoles.length > 0 ? (
          appliedRoles.map((role, index) => (
            <div key={index} className="flex flex-col p-4">
              <h3 className="text-lg font-bold">{role.title}</h3>
              <p>Estimated Hours: {role.estimatedHours} hrs</p>
              <p>Skills: {role.skills}</p>
              <p>Points: {role.points}</p>
            </div>
          ))
        ) : (
          <p>No applied projects</p>
        )}
      </div>
    </div>
  )
})

export default AppliedProject
