import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { APP_BACKGROUND_IMG } from '../utils/constant'

const GPTSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className='object-cover' src={APP_BACKGROUND_IMG}
          alt='APP-Background-image' />
      </div>
      <div className=''>
        <GPTSearchBar />
        <GPTMovieSuggestion />
      </div>
    </>

  )
}

export default GPTSearch