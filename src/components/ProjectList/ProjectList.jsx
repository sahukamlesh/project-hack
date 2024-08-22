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
  const { user } = useAuth();
  console.log('userName',user)
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
    try {
      setAppliedRoles(prevRoles => [...prevRoles, appliedCard]);
       // Get the auth object from the useAuth hook
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      // Save the applied project to Firestore
      await addDoc(collection(db, 'applications'), {
        title: appliedCard.title,
        estimatedHours: appliedCard.estimatedHours,
        skills: appliedCard.skills,
        points: appliedCard.points,
        userId: user.uid, // Use the actual user ID from the auth context
        status: 'PENDING'
      });
      // Update local state to reflect applied projects
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
              statusFilter === 'IN PROGRESS'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleStatusChange('IN PROGRESS')}
          >
            In-progress
          </div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-sm ${
              statusFilter === 'ALL'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleStatusChange('ALL')}
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
