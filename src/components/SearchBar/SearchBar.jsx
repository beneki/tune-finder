import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMusic } from '../slices/musicSlice'; // Adjust the path as needed

const useMusicSearch = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const dispatch = useDispatch();

  const searchMusic = async (e) => {
    e.preventDefault();
    const trimmedSearchTxt = searchTxt.trim();

    if (!trimmedSearchTxt) return;

    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${trimmedSearchTxt}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        dispatch(setMusic(data.results)); // Save response in Redux state
      }
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  return { searchTxt, setSearchTxt, searchMusic };
};

export default useMusicSearch;
