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
            <div className="w-[75%] h-full overflow-hidden flex-1 flex flex-col ">
                <div className='w-full h-[15vh]'>
                <Navbar />
                </div>
                <main className="flex-1 p-6 w-full bg-gray-300 min-h-[85vh] overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
