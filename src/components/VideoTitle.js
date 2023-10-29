import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div
            className='w-screen aspect-video , 
                     pt-[15%] px-24 text-white absolute bg-gradient-to-r from-black'>
            <h1
                className='text-5xl font-bold'>
                {title}
            </h1>
            <p className='py-6 text-lg w-1/2'>{overview}</p>
            <div className=''>
                <button
                    className='bg-white  px-12 p-4 rounded-lg text-xl text-black hover:bg-opacity-80'>
                    ▶ Play
                </button>
                <button className=' mx-2 bg-gray-500 bg-opacity-50 px-12 p-4 rounded-lg text-xl text-white'>ℹ️ More Info</button>

            </div>
        </div>
    )
}

export default VideoTitle