import React, { useState } from 'react';
import useMusicSearch from '../../hooks/useMusicSearch';

function SearchBar() {
  const [searchTxt, setSearchTxt] = useState('');
  const { searchMusic } = useMusicSearch();

  const validateSearchText = (text) => text.trim().length > 2; // Minimum 3 characters

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSearchText(searchTxt)) {
      searchMusic(searchTxt);
      setSearchTxt(''); // Clear input after search
    } else {
      alert('Please enter at least 3 characters.');
    }
  };

  return (
    <nav className="navbar">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
          placeholder="Search your music"
          className="input" // Optional: Add Tailwind classes for styling
        />
        <button type="submit" className="button">Search</button> {/* Optional: Tailwind styling */}
      </form>
    </nav>
  );
}

export default SearchBar;
