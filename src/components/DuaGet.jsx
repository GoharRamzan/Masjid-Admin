import React, { useEffect, useState } from 'react';
import { getDuas, deleteDua } from '../api/DuaApi.js'; // APIs for dua
import { toast, ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import Modal from './Modal.jsx';

const socket = io('http://localhost:5000'); // apna backend URL

const DuaGet = () => {
    const [duas, setDuas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState({}); // for delete loading state
    const [filter, setFilter] = useState('All'); // 'All', 'Top', 'Bottom'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDuas = async () => {
        try {
            setLoading(true);
            const response = await getDuas(); // api call
            const duaData = response?.data || [];
            setDuas(duaData);
        } catch (err) {
            setError(err.message || 'Failed to fetch duas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const UID = localStorage.getItem('UID');
        if (UID) {
            socket.emit('joinRoom', UID);
            console.log('✅ Joined socket room for UID:', UID);
        }

        fetchDuas();

        socket.on('DuaUpdated', fetchDuas);

        return () => {
            socket.off('DuaUpdated', fetchDuas);
        };
    }, []);

    const handleDelete = async (duaId) => {
        setIsLoading((prev) => ({ ...prev, [duaId]: true }));
        try {
            const UID = localStorage.getItem('UID');
            const response = await deleteDua({ UID, duaId });
            setIsModalOpen(false);
            toast.success(response.message || 'Dua deleted successfully');
            setDuas((prev) => prev.filter((d) => d._id !== duaId));
        } catch (err) {
            toast.error(`Failed to delete dua: ${err.message}`);
        } finally {
            setIsLoading((prev) => ({ ...prev, [duaId]: false }));
        }
    };

    // Filter duas based on filter state
    const filteredDuas = filter === 'All' ? duas : duas.filter(dua => dua.type.toLowerCase() === filter.toLowerCase());

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="p-6">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-2xl font-semibold mb-6 text-center">Duas List</h2>
            <div className='w-full flex space-x-4 justify-center p-3 items-center text-lg md:text-2xl text-white font-bold'>

                <span
                    onClick={() => setFilter('All')}
                    className={`rounded-2xl px-6 py-2 cursor-pointer transition hover:bg-[#264736] hover:scale-105 ${filter === 'All' ? 'bg-[#021a0d]' : 'bg-greenback'
                        }`}
                >
                    All Duas
                </span>
                <span
                    onClick={() => setFilter('topDua')}
                    className={`rounded-2xl px-6 py-2 cursor-pointer transition hover:bg-[#264736] hover:scale-105 ${filter === 'topDua' ? 'bg-[#021a0d]' : 'bg-greenback'
                        }`}
                >
                    Top Dua
                </span>
                <span
                    onClick={() => setFilter('bottomDua')}
                    className={`rounded-2xl px-6 py-2 cursor-pointer transition hover:bg-[#264736] hover:scale-105 ${filter === 'bottomDua' ? 'bg-[#021a0d]' : 'bg-greenback'
                        }`}
                >
                    Bottom Dua
                </span>

            </div>
            {filteredDuas.length === 0 ? (
                <div className="text-center text-gray-500 font-medium">No Dua Found</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredDuas.map((dua) => (
                        <div
                            key={dua._id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-bold text-gray-700">Type: {dua.type}</h3>
                            <p className="text-gray-600 mt-2 font-serif text-2xl">{dua.content}</p>

                            <button
                                onClick={() => setIsModalOpen(true)}

                                className="mt-4 bottom-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                            >
                                Delete
                            </button>

                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <h1 className='text-2xl text-red-600'>Confirm Delete</h1>
                                <p className='py-2'>Are you sure you want to delete this data </p>
                                <span className='flex space-x-4 justify-end mt-6'>
                                    <button
                                        onClick={() => setIsModalOpen(false)}

                                        className="mt-4 bottom-0 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dua._id)}

                                        disabled={isLoading[dua._id]}
                                        className="mt-4 bottom-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition"
                                    >
                                        {isLoading[dua._id] ? (
                                            <div className="flex items-center space-x-2">
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                                    />
                                                </svg>
                                                <span>Deleting...</span>
                                            </div>
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </span>
                            </Modal>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DuaGet;
