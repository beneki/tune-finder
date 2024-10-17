import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setSelectedMusic, setTracks } from '../store/musicSlice';
import axios from 'axios';

const useMusicSearch = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const url = 'https://itunes.apple.com';

    const searchMusic = async (searchTxt = 'pop') => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            const response = await axios.get(`${url}/search?term=${searchTxt}`);
            const results = response.data.results;
            if (results && results.length > 0) {
                dispatch(setTracks(results));
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

    const findMusicById = async (id) => {
        try {
            const response = await axios.get(`${url}/lookup?id=${id}`);
            if (response.data.results.length > 0) {
                const track = response.data.results[0];
                dispatch(setSelectedMusic(track));
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
    }

    return { searchMusic, findMusicById, loading, error, success };
};

export default useMusicSearch;
