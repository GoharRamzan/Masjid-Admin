import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { addDuas, getDuas, deleteDua } from '../api/DuaApi.js';
import DuaGet from '../components/DuaGet.jsx';
const Dua = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [duaContent, setDuaContent] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDua = async () => {
    const newErrors = {};
    const wordCount = duaContent.trim().split(/\s+/).filter(Boolean).length;

    if (!selectedType) {
      newErrors.selectedType = "Please select a dua type.";
    }

    if (!duaContent.trim()) {
      newErrors.duaContent = "Dua content is required.";
    } else if (wordCount > 200) {
      newErrors.duaContent = "Dua content cannot exceed 200 words.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSaving(true);
    // ✅ API Call
    try {
      const UID = localStorage.getItem('UID'); // Ensure this is stored
      const payload = {
        UID,
        duas: [
          {
            type: selectedType,
            content: duaContent,
          },
        ],
      };

      const response = await addDuas(payload);
      toast.success(response.message)


      // ✅ Reset and close modal
      setSelectedType("");
      setDuaContent("");
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      // alert(error.message); // Or use toast
      toast.error(error.message || "Something went wrong while adding dua.");
    } finally {
      setIsSaving(false);
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
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add Dua</h2>

          {/* Select Field */}
          <label className="block mb-1 text-sm font-medium text-gray-700">Dua Type</label>
          <select
            className="w-full mb-1 p-2 border border-gray-300 rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            <option value="topDua">topDua</option>
            <option value="bottomDua">bottomDua</option>
          </select>
          {errors.selectedType && <p className="text-red-500 text-sm mb-2">{errors.selectedType}</p>}

          {/* Textarea Field */}
          <label className="block mb-1 text-sm font-medium text-gray-700">Dua Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            value={duaContent}
            onChange={(e) => {
              const inputText = e.target.value;
              const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

              if (wordCount <= 200) {
                setDuaContent(inputText);
                setErrors((prev) => ({ ...prev, duaContent: "" }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  duaContent: "Dua content cannot exceed 200 words.",
                }));
              }
            }}
            placeholder="Enter your dua here (Max 200 words)..."
          ></textarea>
          <div className="flex justify-between text-sm text-gray-500 mt-1 mb-2">
            <span>{duaContent.trim().split(/\s+/).filter(Boolean).length} / 200 words</span>
          </div>
          {errors.duaContent && <p className="text-red-500 text-sm">{errors.duaContent}</p>}

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDua}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? (
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
                  <span>Saving...</span>
                </div>
              ) : (
                'Save'
              )}
            </button>

          </div>
        </div>
      </Modal> 
      <DuaGet />
    </div>
  );
};

export default Dua;
