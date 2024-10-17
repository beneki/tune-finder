import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MusicCard } from '..';
import useMusicSearch from '../../hooks/useMusicSearch';
import { useNavigate, useParams } from 'react-router-dom';

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};


// since the iTune api is not providing pagination structure so I used in memory pagination for scrolling
const pageSize = 12;
const MusicList = () => {
    const navigate = useNavigate();
    const { term } = useParams();
    const { searchMusic, loading, error } = useMusicSearch();
    const batchResult = useSelector((state) => state.music.results);
    const [musicPage, setMusicPage] = useState([]);
    const pageConfig = useRef({ size: 0, lastIx: 0 })
    const [loadingMore, setLoadingMore] = useState(false);
    const hasSearchedRef = useRef(false);

    // Initial fetch when the component mounts
    useEffect(() => {
        if (batchResult.length < 1 && !hasSearchedRef.current) {
            const searchTerm = term || 'pop';
            searchMusic(searchTerm); // Fetch the first 6 tracks
            hasSearchedRef.current = true;
        }
    }, [searchMusic]);

    useEffect(() => {
        if (batchResult.length > 0) {
            const firstPage = batchResult.slice(0, pageSize);
            setMusicPage(firstPage);
            pageConfig.current.lastIx = pageSize;
            pageConfig.current.size = firstPage.length;
        }
    }, [batchResult.length]);


    const loadMoreTracks = () => {
        const { size, lastIx } = pageConfig.current;
        if (loadingMore || lastIx >= batchResult.length) return;

        setLoadingMore(true);

        const nextSegment = batchResult.slice(lastIx, lastIx + pageSize); // Fetch the next segment of tracks
        pageConfig.current.lastIx += nextSegment.length;

        if (nextSegment.length === pageSize) {
            setMusicPage((_) => [...nextSegment]);
            pageConfig.current.size = nextSegment.length;
        } else if (nextSegment.length > 0) {
            setMusicPage((prevMusicPage) => [...prevMusicPage, ...nextSegment]);
            pageConfig.current.size += nextSegment.length;
        } else {

        }

        setLoadingMore(false);
    };


    const loadPrevTracks = () => {
        const { size, lastIx } = pageConfig.current;

        if (loadingMore || size === 0 || lastIx <= pageSize) return;

        setLoadingMore(true);

        const firstIdxInPage = lastIx - size;
        const prevSegment = batchResult.slice(firstIdxInPage - pageSize, firstIdxInPage);

        // Update the size and last index for pagination

        pageConfig.current.lastIx -= size;
        pageConfig.current.size = pageSize;


        if (prevSegment.length > 0) {
            setMusicPage(prevSegment); // Set the musicPage to the previous segment
        }

        setLoadingMore(false);
    };


    useEffect(() => {
        const handleScroll = throttle(() => {
            if (document.documentElement.scrollTop === 0) {
                loadPrevTracks(); // Call the additional function when at the top
                lastScroll = document.documentElement.scrollTop = 35; // manually change the scroll position to give better ux
            }
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 10
            ) {
                loadMoreTracks();
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [batchResult]);

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Music List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {musicPage.map((music) => (
                    <MusicCard key={music.trackId} music={music} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {loadingMore && <p>Loading more tracks...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div >
    );
};

export default MusicList;
