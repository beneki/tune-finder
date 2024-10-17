import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
    name: 'music',
    initialState: {
        results: [],
        selectedMusic: null,
    },
    reducers: {
        setMusic: (state, action) => {
            state.results = action.payload; // set all the musics list that is coming back from the search request
        },
        setSelectedMusic: (state, action) => {
            state.selectedMusic = action.payload; // Set selected music for detail view
        },
    },
});

export const { setMusic, setSelectedMusic } = musicSlice.actions;
export default musicSlice.reducer;
