import React, { useState } from 'react';
import { Modal, Box, Avatar, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updateAvatar } from '../../reducers/profileSlice';

const ProfilePage = ({ open, handleClose, user }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    birthday: profile?.birthday || '',
    state: profile?.state || '',
    sobrietyYears: profile?.sobrietyYears || '',
  });

  const handleSave = () => {
    dispatch(updateProfile(profileData));
    handleClose();
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
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 4, bgcolor: 'background.paper', borderRadius: 2, width: '400px', margin: 'auto', marginTop: '1%' }}>
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>
        <Avatar src={avatar} sx={{ width: 56, height: 56, marginBottom: 2 }} />
        <Button variant="contained" component="label">
          Upload Avatar
          <input type="file" hidden onChange={handleAvatarChange} />
        </Button>
        <TextField
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Birthday"
          name="birthday"
          value={profileData.birthday}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="State"
          name="state"
          value={profileData.state}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Sobriety Years"
          name="sobrietyYears"
          value={profileData.sobrietyYears}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfilePage;


