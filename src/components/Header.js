import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/contant';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user)
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
    return (


        <div
            className='absolute w-screen px-8 py-2 bg-gradient-to-b from from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src={LOGO} alt='netflix-logo' />
            {user && <div className='flex p-2'>
                <img
                    className='w-12 h-12'
                    src={USER_AVATAR} alt="syedalihasan" />
                <button
                    className='font-bold text-white cursor-pointer' onClick={handleSignout}>Sign out
                </button>
            </div>}
        </div>


    )
}

export default Header