import React from 'react'
import lang from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GPTSearchBar = () => {
    const selectedLang = useSelector((store) => store.config?.lang);

    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black'>
                <input
                    type='text'
                    className='w-[70%] p-4 m-4'
                    placeholder={`${lang[selectedLang].gtpSearchPlaceHolder}..`
                    }
                />
                <button
                    className='py-2 px-10 text-lg bg-red-700 text-white rounded-lg'>
                    {lang[selectedLang].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar