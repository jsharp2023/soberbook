import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updateAvatar } from '../../reducers/profileSlice';

const ProfilePage = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  const [avatar, setAvatar] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    birthday: '',
    state: '',
    sobrietyYears: '',
  });

  // ✅ Load profile info when modal opens
  useEffect(() => {
    if (open) {
      setProfileData({
        name: profile?.name || '',
        birthday: profile?.birthday || '',
        state: profile?.state || '',
        sobrietyYears: profile?.sobrietyYears || '',
      });
      setAvatar(profile?.avatar || '');
    }
  }, [open, profile]);

  const handleSave = () => {
    dispatch(updateProfile(profileData));
    handleClose(); // ✅ close the modal
  };




  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setAvatar(result);
        dispatch(updateAvatar(result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={avatar}
            alt="Avatar"
            className="w-14 h-14 rounded-full object-cover border border-gray-300"
          />
          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Upload Avatar
            <input type="file" hidden onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Birthday</label>
            <input
              type="text"
              name="birthday"
              value={profileData.birthday}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={profileData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sobriety Years</label>
            <input
              type="text"
              name="sobrietyYears"
              value={profileData.sobrietyYears}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
