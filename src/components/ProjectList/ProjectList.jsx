import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import cardsData from '../../cardData.json';
import AppliedProject from '../AppliedProjects/AppliedProjects';
import { useAuth } from '../../AuthContext';

const ProjectList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [applied, setApplied] = useState(false);
  const [appliedRoles, setAppliedRoles] = useState([]);
  const { user,userName } = useAuth();
  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setApplied(false);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    setApplied(false);
  };

  const handleClickAppliedProject = () => {
    setApplied(true);
  };

  const handleCloseAppliedProject = () => {
    setApplied(false);
  };

  const handleConfirmApply = async (appliedCard) => {
    console.log("appliedCard",appliedCard)
    try {
      setAppliedRoles(prevRoles => [...prevRoles, appliedCard]);
      if (!user) {
        throw new Error('User not authenticated');
      }
      await addDoc(collection(db, 'applications'), {
        title: appliedCard.title,
        estimatedHours: appliedCard.estimatedHours,
        skills: appliedCard.skills,
        points: appliedCard.points,
        userId: user.uid,
        userName : userName,
        status: 'PENDING'
      });
    } catch (error) {
      console.error('Error saving applied project:', error);
    }
  };

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
            setSearchQuery={handleSearchQueryChange} 
          />
        </div>

        <div className="flex items-center space-x-2 mr-[20%]">
          <div className="flex flex-wrap justify-center">
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full ${statusFilter === "OPEN" ? "bg-green-500 text-white" : ""}`}
              onClick={() => handleStatusChange("OPEN")}
            >
              Open
            </button>
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full ${statusFilter === "CLOSED" ? "bg-red-500 text-white" : ""}`}
              onClick={() => handleStatusChange("CLOSED")}
            >
              Closed
            </button>
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full ${statusFilter === 'IN PROGRESS' ? 'bg-yellow-500 text-white' : ''}`}
              onClick={() => handleStatusChange('IN PROGRESS')}
            >
              In-progress
            </button>
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full ${statusFilter === 'ALL' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleStatusChange('ALL')}
            >
              All
            </button>
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
        <AppliedProject onClose={handleCloseAppliedProject} appliedRoles={appliedRoles} />
      ) : filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <Card key={index} card={card} onConfirmApply={handleConfirmApply} />
        ))
      ) : (
        <p>No projects match your search criteria.</p>
      )}
    </div>
  );
};

export default ProjectList;