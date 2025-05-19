import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaTachometerAlt, FaUsers, FaBed, FaClipboardList, FaUserTie, FaQuran } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import { IoIosTime } from 'react-icons/io';
import image from '../assets/logo.png'
import logo from '../assets/masjid.png'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'Dashboard', path: '/', icon: <FaTachometerAlt /> },
        { name: 'Namaz Time', path: '/namaztime', icon: <IoIosTime /> },
        { name: 'Dua', path: '/dua', icon: <FaQuran /> },

    ];

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="lg:hidden fixed top-8 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar */}
            <div className={`shadow-2xl top-0 left-0 fixed h-full w-64 bg-[#ffffff] text-[#016630] p-5 z-40 transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

                <div className="text-2xl font-bold mb-6 flex items-center justify-center">
                    <span><img src={logo} alt="image is loading......." className='w-36' /></span>
                </div>

                <nav className="flex flex-col gap-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2 px-4 rounded-lg transition bg-hover hover:text-white ${isActive ? 'bg-greenback text-white font-semibold' : ''
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {link.icon}
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                <div className='bottom-4 absolute  '>
                    <LogoutButton />
                    <img src={image} alt="" className='relative w-20 mt-3 left-16' />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
