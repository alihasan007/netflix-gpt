import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { auth } from '../utils/firebase';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Header from './Header'
import { APP_BACKGROUND_IMG } from '../utils/contant';


export const Login = () => {
    const dispatch = useDispatch();

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
                    }).catch((error) => {
                        setErrorMsg(error.errorMessage)
                    });
                    // ...
                })
                .catch((error) => {
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
                <img src={APP_BACKGROUND_IMG}
                    alt='APP-Background-image' />
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
