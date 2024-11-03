import { Link } from 'react-router-dom';

const MusicCard = ({ music }) => {
    return (
        <div className="max-w-sm bg-black border border-transparent rounded-lg shadow-lg p-5 m-2 transition-transform transform hover:scale-105 hover:shadow-neon">

            <img
                className="rounded-t-lg"
                src={music.artworkUrl100}
                alt={`${music.trackName} artwork`}
            />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold text-white">{music.trackName}</h5>
                <p className="mb-3 text-gray-400">{music.artistName}</p>
                <p className="mb-3 text-gray-400">{music.collectionName}</p>
                <Link
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-blue-500 rounded-lg hover:bg-blue-600"
                    to={`/music/${music.trackId}`}>
                    Read more
                    <svg
                        className="w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Link>
            </div>

        </div>
    );
};

export default MusicCard;
