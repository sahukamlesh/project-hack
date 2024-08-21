import React, { forwardRef } from "react";

const AppliedProject = forwardRef(({ onClose }, ref) => {
  return (
    <div className="flex justify-center items-center h-48" ref={ref}>
      <div className="relative text-center bg-gray-100 p-6 rounded-lg shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-blue-700">
          You've applied to this project!
        </h2>
        <p className="text-gray-700 mt-2">
          Thank you for applying. We will review your application and get
          back to you soon.
        </p>
      </div>
    </div>
  );
});

export default AppliedProject;
