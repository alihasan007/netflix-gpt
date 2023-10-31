import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constant'
import { showSearchedMovies } from '../store/gptSlice'

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const searchRef = useRef(null)
    const selectedLang = useSelector((store) => store.config?.lang);

    // search movies in tmdb db
    const searchMovieTmdb = async (query) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const json = await data.json()
        return json.results;
    }

    const handleGptSearchClick = async () => {
        const searchQuery = 'Act a movie recommendation system and suggest some movies for the query' + searchRef.current.value + " only give me names of 5 movies,comma seperated like the example result given ahead eg: Don,Dhoom,Iron Man,Captain America"
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: searchQuery }],
            model: 'gpt-3.5-turbo',
        });
        const gptResult = chatCompletion.choices?.[0].message?.content.split(",")
        const data = gptResult.map((movieName) => {
            return searchMovieTmdb(movieName);
        })
        const tmdbResult = await Promise.all(data)
        console.log(process.env.REACT_APP_TMDB_KEY)
        dispatch(showSearchedMovies({ searchedMovies: gptResult, searchedResult: tmdbResult }));
    }
    return (
        <div className='pt-[10%] flex justify-center'>
            <form
                className='w-1/2 bg-black'
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type='text'
                    ref={searchRef}
                    className='w-[70%] p-4 m-4'
                    placeholder={`${lang[selectedLang].gtpSearchPlaceHolder}..`
                    }
                />
                <button
                    className='py-2 px-10 text-lg bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>
                    {lang[selectedLang].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar