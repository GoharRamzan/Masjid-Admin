import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen h-full overflow-hidden  flex  ">
            <div className=' lg:w-64 h-full overflow-hidden ' >
                <Sidebar />
            </div>
            <div className=" w-[75%] h-screen overflow-hidden flex-1 flex flex-col bg-gray-300">
                <div className='fixed w-full h-[15vh] z-10'>
                <Navbar />
                </div>
                <main className="flex mt-30 h-full overflow-y-auto p-6 w-full   overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
