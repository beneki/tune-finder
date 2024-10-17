import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMusicSearch from '../../hooks/useMusicSearch';

const MusicDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [music, setMusic] = useState(null);
    const { findMusicById, loading, error, success } = useMusicSearch();
    const { results, selectedMusic } = useSelector((state) => state.music);

    useEffect(() => {
        const fetchMusic = async () => {
            // check memory first
            if (results.length > 0) {
                const track = results.find((track) => track.trackId === parseInt(id));
                localStorage.setItem(`music_track`, JSON.stringify(track)); // Save to local storage
                setMusic(track)
                return;
            }

            // Check local storage 
            const cachedMusic = localStorage.getItem(`music_track`);
            if (cachedMusic) {
                setMusic(JSON.parse(cachedMusic)); // Set music from local storage
                return
            }

            // if data is not cached then request iTunes endpoint
            findMusicById(id)

        };

        fetchMusic();
    }, [id]);

    useEffect(() => {
        if (success) {
            setMusic(selectedMusic)
        }
    }, [success]);

    if (!music) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-white mt-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Back
            </button>
            <h1 className="text-3xl font-extrabold mb-4 text-center">{music.trackName}</h1>
            <img
                src={music.artworkUrl100}
                alt={music.trackName}
                className="rounded-lg shadow-md mb-4 mx-auto transition-transform transform hover:scale-105"
            />
            <div className="mb-4 text-lg">
                <p className="mb-2"><strong>Artist:</strong> {music.artistName}</p>
                <p className="mb-2"><strong>Album:</strong> {music.collectionName}</p>
                <p className="mb-2"><strong>Release Date:</strong> {new Date(music.releaseDate).toLocaleDateString()}</p>
                <p className="mb-2"><strong>Genre:</strong> {music.primaryGenreName}</p>
            </div>
            <div className="text-center">
                <a
                    href={music.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
                >
                    Listen on iTunes
                </a>
            </div>
        </div>
    );
};

export default MusicDetail;
