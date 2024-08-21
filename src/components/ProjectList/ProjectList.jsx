import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import cardsData from "../../cardData.json";

const ProjectList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [applied, setApplied] = useState(false);
  const cardRef = useRef(null);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleClickAppliedProject = () => {
    setApplied(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setApplied(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  const filteredCards = cardsData.filter(
    (card) =>
      (statusFilter === "ALL" || card.status === statusFilter) &&
      (card.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.points.toString().includes(searchQuery) ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="flex-1 ml-[10%]">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="flex items-center space-x-2 mr-[20%]">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm ${
              statusFilter === "OPEN"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleStatusChange("OPEN")}
          >
            Open
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm ${
              statusFilter === "CLOSED"
                ? "bg-red-500 text-red"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleStatusChange("CLOSED")}
          >
            Closed
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm ${
              statusFilter === "IN PROGRESS"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleStatusChange("IN PROGRESS")}
          >
            In-progress
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm ${
              statusFilter === "ALL"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleStatusChange("ALL")}
          >
            All
          </div>
        </div>

        <div className="flex items-center mr-[10%]">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600"
            onClick={handleClickAppliedProject}
          >
            Applied Project
          </button>
        </div>
      </div>

      {applied ? (
        <div className="flex justify-center items-center h-48" ref={cardRef}>
          <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">
              You've applied to this project!
            </h2>
            <p className="text-gray-700 mt-2">
              Thank you for applying. We will review your application and get
              back to you soon.
            </p>
          </div>
        </div>
      ) : filteredCards.length > 0 ? (
        filteredCards.map((card, index) => <Card key={index} card={card} />)
      ) : (
        <p>No projects match your search criteria.</p>
      )}
    </div>
  );
};

export default ProjectList;
