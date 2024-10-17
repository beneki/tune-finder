import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setTracks } from '../store/musicSlice';

const useMusicSearch = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const searchMusic = async (searchTxt) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`https://itunes.apple.com/search?term=${searchTxt}`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                dispatch(setTracks(data.results));
                setSuccess(true); // Set success to true when results are found
            } else {
                setError('No results found.'); // Handle no results scenario
            }
        } catch (error) {
            console.error('Error fetching music:', error);
            setError('Failed to fetch music. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return { searchMusic, loading, error, success };
};

export default useMusicSearch;
