import React, { useEffect, useState } from 'react';
import { getSchedule, deleteSchedule } from '../api/scheduleApi';
import { toast, ToastContainer } from 'react-toastify';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // <-- your backend URL or use env variable

const TimeGet = () => {
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState('');
    const [isLoading, setIsLoading] = useState(false);




    const fetchSchedule = async () => {
    try {
        setLoading(true);
        const response = await getSchedule();
        const scheduleData = response?.data?.[0]?.prayers || [];
        setPrayers(scheduleData);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    const UID = localStorage.getItem('UID');
    
    // Join the room after getting UID
    if (UID) {
        socket.emit('joinRoom', UID);
        console.log('✅ Joined socket room for UID:', UID);
    }

    fetchSchedule();

    // Listen for updates
    socket.on('prayerScheduleUpdated', fetchSchedule);

    return () => {
        socket.off('prayerScheduleUpdated', fetchSchedule);
    };
}, []);



    const handleDelete = async (prayerName) => {
         setIsLoading((prev) => ({ ...prev, [prayerName]: true }));
        try {
            setDeleting(prayerName);
            const UID = localStorage.getItem('UID')
            const response = await deleteSchedule({ UID, prayerName });

            toast.success(response.message);
            setPrayers((prev) => prev.filter(p => p.name !== prayerName)); // remove from UI
        } catch (err) {
            toast.error(`Failed to delete ${prayerName}: ${err.message}`);
        } finally {
            setDeleting('');
            setIsLoading((prev) => ({ ...prev, [prayerName]: false }));;
        }
    };

 if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <ToastContainer position="top-center" autoClose={3000} />
            <h2 className="text-2xl font-semibold mb-6 text-center">Namaz Schedule</h2>
             {prayers.length === 0 ? (
                <div className="text-center text-gray-500 font-medium">No Record Found</div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {prayers.map((prayer) => (
                    <div key={prayer._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-gray-700">{prayer.name}</h3>
                        <h3 className="text-xl font-bold text-gray-700">{prayer.urdu_title}</h3>
                        <p className="text-gray-600 mt-2">Time: <span className="font-medium">{prayer.timing}</span></p>
                        <button
                            onClick={() => handleDelete(prayer.name)}
                            disabled={isLoading[prayer.name]}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                        >
                            {isLoading[prayer.name] ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                    </svg>
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default TimeGet;
