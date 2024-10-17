import React, { useState, useEffect } from 'react';
import useMusicSearch from '../../hooks/useMusicSearch';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [searchTxt, setSearchTxt] = useState('');
  const { searchMusic, loading, error, success } = useMusicSearch();

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

  useEffect(() => {
    if (success) {
      navigate('/musics');
    }
  }, [success, navigate]);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-lg">
      <form
        className="flex items-center justify-center space-x-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
          placeholder="Search your music"
          className="w-full max-w-lg px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-gray-800 placeholder-gray-500 shadow-md"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-black rounded-full shadow-md hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </nav>
  );
}

export default SearchBar;
