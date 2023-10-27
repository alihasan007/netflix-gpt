import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Header from './Header'


export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null);

    const userNameRef = useRef(null)
    const emailRef = useRef(null);
    const passwordRef = useRef(null)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    const handleButtonClick = (e) => {
        e.preventDefault()
        //validate the form data
        const msg = checkValidData(emailRef.current.value, passwordRef.current.value)
        setErrorMsg(msg)
        if (msg) return
        //sign in and sign up
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: userNameRef.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName } = auth;
                        dispatch(addUser({ uid, email, displayName }))
                        navigate('/browse')

                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                        setErrorMsg(error.errorMessage)
                    });
                    // ...
                })
                .catch((error) => {
                    console.log(error)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage)
                    // ..
                });
        } else {
            // sign in logic
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    navigate('/browse')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage)
                });
        }

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
                    {!isSignInForm && <input
                        ref={userNameRef} type='text' placeholder='Your Name' className='p-4 my-2 w-full bg-gray-700 rounded-lg' />}
                    <input
                        type='text'
                        ref={emailRef}
                        placeholder='Email'
                        className='p-4 my-2 w-full bg-gray-700 rounded-lg' />
                    <input
                        type='password'
                        ref={passwordRef}
                        placeholder='Password' className='p-4 my-2 w-full bg-gray-700 rounded-lg' />
                    <p className='text-red-500 text-sm font-bold py-2'>{errorMsg}</p>
                    <button
                        className='p-4 my-6 bg-red-700 w-full rounded-lg'
                        onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                    <p className='py-4 text-sm' onClick={toggleSignInForm}>{isSignInForm ? 'New to netflix? Sign up now' : 'Already registered? Sign In Now'}</p>
                </form>

            </div>
        </div>
    )
}
