// src/api/duaApi.js
import API from './axiosInstance';

// ✅ ADD or UPDATE Duas
export const addDuas = async ({ UID, duas }) => {
  try {
    const response = await API.post('/addDua', {
      UID,
      duas,
    });
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to add/update duas';
    throw new Error(errMsg);
  }
};


// ✅ GET Duas
export const getDuas = async () => {
  try {
    const UID = localStorage.getItem('UID');
    const response = await API.get(`/getDua?UID=${UID}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to fetch duas';
    throw new Error(errMsg);
  }
};

// ✅ DELETE Dua (by UID and type like "topDua" or "bottomDua")
export const deleteDua = async ({ UID, duaId }) => {
  try {
    const response = await API.delete('/deleteDua', {
      params: { UID, duaId }
    });
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || 'Failed to delete dua';
    throw new Error(errMsg);
  }
};
