import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { APP_BACKGROUND_IMG } from '../utils/constant'

const GPTSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src={APP_BACKGROUND_IMG}
          alt='APP-Background-image' />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestion />
    </div>
  )
}

export default GPTSearch