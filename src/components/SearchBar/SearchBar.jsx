import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-3xl mx-16 p-4 ">
      <input
        type="text"
        placeholder="Search by skills , incentive duration  or title"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
