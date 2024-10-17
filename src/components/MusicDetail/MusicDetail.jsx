// src/components/MusicDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MusicDetail = () => {
    const { id } = useParams();
    const results = useSelector((state) => state.music.searchResults);
    const music = results.find((track) => track.trackId === parseInt(id));

    if (!music) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{music.trackName}</h1>
            <img
                src={music.artworkUrl100}
                alt={music.trackName}
                className="rounded shadow-md mb-4"
            />
            <p className="text-lg mb-2"><strong>Artist:</strong> {music.artistName}</p>
            <p className="text-lg mb-2"><strong>Album:</strong> {music.collectionName}</p>
            <p className="text-lg mb-2"><strong>Release Date:</strong> {music.releaseDate}</p>
            <p className="text-lg mb-2"><strong>Genre:</strong> {music.primaryGenreName}</p>
            <a
                href={music.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Listen on iTunes
            </a>
        </div>
    );
};

export default MusicDetail;
