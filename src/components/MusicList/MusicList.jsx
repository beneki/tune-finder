import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MusicList = () => {
    const results = useSelector((state) => state.music.results);

    return (
        <div>
            <h1>Music List</h1>
            <ul>
                {results.map((music) => (
                    <li key={music.trackId}>
                        <Link to={`/music/${music.trackId}`}>{music.trackName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MusicList;
