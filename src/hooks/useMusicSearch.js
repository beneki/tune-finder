import { useDispatch } from 'react-redux';
import { setMusic } from '../slices/musicSlice';

const useMusicSearch = () => {
    const dispatch = useDispatch();

    const searchMusic = async (searchTxt) => {
        try {
            const response = await fetch(`https://itunes.apple.com/search?term=${searchTxt}`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                dispatch(setMusic(data.results));
            }
        } catch (error) {
            console.error('Error fetching music:', error);
        }
    };

    return { searchMusic };
};

export default useMusicSearch;
