import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        searchedMoviesName: null,
        searchedMoviesResult: null

    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch
        },
        showSearchedMovies: (state, action) => {
            const { searchedMovies, searchedResult } = action.payload
            state.searchedMoviesResult = searchedResult;
            state.searchedMoviesName = searchedMovies;
        }
    }
})

export const { toggleGptSearchView, showSearchedMovies } = gptSlice.actions;
export default gptSlice.reducer;