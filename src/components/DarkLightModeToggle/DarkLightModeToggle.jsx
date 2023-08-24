import React, { useEffect, useState } from 'react';
import { BsSun } from "react-icons/bs";
import { GoMoon } from "react-icons/go";

const DarkLightModeToggle = () => {
    const [mode, setMode] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') || 'dark' : "dark");

    const toggle = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', mode);
        document.querySelector('html').setAttribute('data-theme', mode);
    }, [mode])

    return (
        <div className='flex lg:mr-5 mr-3 justify-center items-center' onClick={toggle}>
            {
                mode === 'dark' ?
                    <button><BsSun className='text-2xl text-orange-400' /></button>
                    :
                    <button><GoMoon className='text-2xl text-blue-900' /></button>
            }
        </div>
    );
};

export default DarkLightModeToggle;