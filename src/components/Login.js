import React, { useState } from 'react'
import Header from './Header'

export const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                    alt='netflic-logo' />
            </div>
            <div>
                <form className='absolute w-1/3 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                    <h1 className='font-bold text-3xl py-4'> {isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                    {!isSignInForm && <input type='text' placeholder='Your Name' className='p-4 my-2 w-full bg-gray-700 rounded-lg' />}
                    <input type='text' placeholder='Email' className='p-4 my-2 w-full bg-gray-700 rounded-lg' />
                    <input type='password' placeholder='Password' className='p-4 my-2 w-full bg-gray-700 rounded-lg' />
                    <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                    <p className='py-4 text-sm' onClick={toggleSignInForm}>{isSignInForm ? 'New to netflix? Sign up now' : 'Already registered? Sign In Now'}</p>
                </form>

            </div>
        </div>
    )
}
