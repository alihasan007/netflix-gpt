import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user)

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
            navigate('/error')
        });
    }
    return (


        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
                alt='netflix-logo' />
            {user && <div className='flex p-2'>
                <img
                    className='w-12 h-12'
                    src="https://occ-0-4409-3647.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZBe7K0DPia9LvzIkQ4yzqX9NocZlAjS1MOyEuBQD1WmFuLKZwvq0bxc4n4_EV73khqgwed0PYLNml0V8LCymt31e7x-8jQ.png?r=229" alt="syedalihasan" />
                <button
                    className='font-bold text-white' onClick={handleSignout}>Sign out</button>
            </div>}
        </div>


    )
}

export default Header