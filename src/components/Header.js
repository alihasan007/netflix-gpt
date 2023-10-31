import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../store/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constant';
import { toggleGptSearchView } from '../store/gptSlice'
import { changeLanguage } from '../store/configSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user)
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }))
                navigate('/browse')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });

        return () => {
            return unsuscribe();
        }
    }, [])
    const handleSignout = () => {
        signOut(auth).then(() => { }).catch((error) => {
            console.log(error)
            navigate('/error')
        });
    }
    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView())
    }
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div
            className='absolute w-screen px-8 py-2 bg-gradient-to-b from from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src={LOGO} alt='netflix-logo' />
            {user && <div className='flex p-2'>
                <select className='px-2 mx-2 rounded-lg bg-gray-900 text-white' onChange={handleLanguageChange}>
                    <option value='en'>English</option>
                    <option value='hindi'>Hindi</option>
                    <option value='spanish'>Spanish</option>
                </select>
                <button className='py-2 px-4 mx-4 my-2 bg-purple-700 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? 'HomePage' : 'GPT Search'}</button>
                <img
                    className='w-12 h-12'
                    src={USER_AVATAR} alt="user_avatar" />
                <button
                    className='font-bold text-white cursor-pointer' onClick={handleSignout}>Sign out
                </button>
            </div>}
        </div>


    )
}

export default Header