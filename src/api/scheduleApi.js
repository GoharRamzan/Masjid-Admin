// src/api/scheduleApi.js
import API from './axiosInstance';

// Add or Update Namaz Schedule
export const addSchedule = async ({ UID, prayers }) => {
  try {
    const response = await API.post('/addSchedule', {
      UID,
      prayers,
    });
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to add schedule';
    throw new Error(errMsg);
  }
};






// ✅ GET Namaz Schedule
export const getSchedule = async () => {
  try {
    const UID = localStorage.getItem('UID');
    const response = await API.get(`/getSchedule?UID=${UID}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to fetch schedule';
    throw new Error(errMsg);
  }
};




// ✅ DELETE prayer by UID and prayerName
export const deleteSchedule = async ({ UID, prayerName }) => {
  try {
    const response = await API.delete('/deleteSchedule', {
      data: { UID, prayerName },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to delete prayer';
    throw new Error(errMsg);
  }
};