import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../store/musicSlice';

const Dashboard = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://itunes.apple.com/search?term=${query}`);
        const data = await response.json();
        dispatch(setSearchResults(data.results));
    };

    return (
        <div className="flex justify-center items-center h-32">
            <form onSubmit={handleSearch} className="w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for music..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
