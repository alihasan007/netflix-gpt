import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const GPTMovieSuggestion = () => {
  const { searchedMoviesName, searchedMoviesResult } = useSelector((store) => store.gpt)
  if (!searchedMoviesName) return null;

  return (
    <div className='p-4 m-4 bg-black bg-opacity-90'>
      <div>
        {searchedMoviesName.map((movieName, i) => {
          return <MovieList key={movieName} title={movieName} movies={searchedMoviesResult[i]} />
        })}
      </div>
    </div>
  )
}

export default GPTMovieSuggestion