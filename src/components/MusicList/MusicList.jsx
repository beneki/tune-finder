import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MusicCard } from './../';
import useMusicSearch from './../../hooks/useMusicSearch';

const MusicList = () => {
    const { searchMusic, loading, error } = useMusicSearch();
    const results = useSelector((state) => state.music.results);
    const hasSearchedRef = useRef(false); // Track if a search has been made

    // Fetch music only if results are empty and no search has been initiated (this is for when user navigates manually to the /musics route, without any search preference)
    useEffect(() => {
        if (results.length === 0 && !hasSearchedRef.current) {
            searchMusic('pop');
            hasSearchedRef.current = true; // Mark that a search has been initiated
        }
    }, [results.length, searchMusic]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Music List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((music) => (
                    <MusicCard key={music.trackId} music={music} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default MusicList;
