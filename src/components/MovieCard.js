import React from 'react'
import { IMG_CDN_URL } from '../utils/contant'

const MovieCard = ({ posterPath }) => {
    return (
        <div className='w-48 pr-4'>
            <img alt='movie-img' src={IMG_CDN_URL + posterPath} />
        </div>
    )
}

export default MovieCard