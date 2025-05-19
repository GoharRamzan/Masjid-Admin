import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { addSchedule } from '../api/scheduleApi'; // 👈 new API import
import { toast, ToastContainer } from 'react-toastify';
import TimeGet from '../components/TimeGet';

const NamazTime = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namazName, setNamazName] = useState('');
  const [namazTime, setNamazTime] = useState('');
  const [urdu, setUrdu] = useState('');
  const [prayers, setPrayers] = useState([]);
  const [UID, setUID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const namazUrduMap = {
    Fajr: 'فجر',
    Zuhar: 'ظہر',
    Asar: 'عصر',
    Maghrib: 'مغرب',
    Isha: 'عشاء'
  };


  useEffect(() => {
    const storedUID = localStorage.getItem('UID');
    if (storedUID) setUID(storedUID);
  }, []);

  const handleAddPrayer = (e) => {
    e.preventDefault();
    if (!namazName || !namazTime || !urdu) return;

    const formattedTime = new Date(`1970-01-01T${namazTime}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const existingIndex = prayers.findIndex(p => p.name === namazName);

    if (existingIndex !== -1) {
      // If namaz already exists, update its time
      const updatedPrayers = [...prayers];
      updatedPrayers[existingIndex].timing = formattedTime;
      setPrayers(updatedPrayers);
    } else {
      // If namaz doesn't exist, add it
      setPrayers([...prayers, { name: namazName, urdu_title: urdu, timing: formattedTime }]);
    }
    // setPrayers([...prayers, { name: namazName, timing: formattedTime }]);
    setNamazName('');
    setNamazTime('');
  };

  const handleSubmitSchedule = async () => {
    setIsLoading(true); // ⏳ Start loading
    if (!UID) return alert('UID not found');
    try {
      const res = await addSchedule({ UID, prayers }); // ✅ use the API function
      console.log('Schedule added:', res);
      toast.success('Schedule successfully submitted!')
      // alert('Schedule successfully submitted!');
      setPrayers([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className='w-full h-full flex flex-col '>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className='w-full flex justify-end items-center mt-3'>
        <button
          className='px-8 lg:px-12 py-2 bg-greenback rounded-2xl text-white font-bold hover:bg-[#025a2b] cursor-pointer hover:scale-105 transition'
          onClick={() => setIsModalOpen(true)}
        >
          Add New
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className='text-xl font-bold mb-4 text-[#016630]'>Add Namaz Time</h2>

        <form className='flex flex-col gap-4' onSubmit={handleAddPrayer}>
          <select
            type="text"
            placeholder="Select Name"
            className="border rounded px-4 py-2"
            value={namazName}
            onChange={(e) =>{
               const selectedNamaz = e.target.value;
              setNamazName(selectedNamaz);
              setUrdu(namazUrduMap[selectedNamaz] || '');
            }}
            required
          >
            <option value="">Select Namaz</option>
            <option value="Fajr">Fajr</option>
            <option value="Zuhar">Zuhar</option>
            <option value="Asar">Asar</option>
            <option value="Maghrib">Maghrib</option>
            <option value="Isha">Isha</option>
          </select>

          <input
            type="text"
            className="border rounded px-4 py-2 font-serif text-xl"
            value={urdu}
            onChange={(e) => setUrdu(e.target.value)}
            required
            readOnly
          />
          <input
            type="time"
            className="border rounded px-4 py-2"
            value={namazTime}
            onChange={(e) => setNamazTime(e.target.value)}
            required
          />
          <button type="submit" className='bg-greenback text-white px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition'>
            Add
          </button>
        </form>

        <div className="mt-4 space-y-2">
          {prayers.map((prayer, idx) => (
            <div key={idx} className="flex justify-between items-center border p-3 rounded shadow-sm">
              <div className="text-[#025a2b] font-medium">
                {prayer.name} - {prayer.urdu_title} - {prayer.timing}
              </div>
              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setNamazName(prayer.name);
                    // Convert formatted time (e.g., "06:00 AM") back to "06:00"
                    setUrdu(prayer.urdu_title)
                    setNamazTime(prayer.timing);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    setPrayers(prayers.filter((_, i) => i !== idx));
                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
          <button
            className='mt-4 bg-[#025a2b] text-white px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition'
            onClick={handleSubmitSchedule}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Schedule'
            )}
          </button>
        </div>

      </Modal>

      <TimeGet />
    </div>
  );
};

export default NamazTime;
