import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(query); // Call the passed down onSearch function
  };

  const handleSearchClick = () => {

    if (onSearch) {
        // Call the search handler if it exists when the button is clicked
        onSearch(query);
      }
      // Navigate to the home page
      navigate('/');
  
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
