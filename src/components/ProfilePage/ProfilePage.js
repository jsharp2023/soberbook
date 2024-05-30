import React, { useState } from 'react';
import { Container, TextField, Button, Avatar } from '@mui/material';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ toggleProfile }) => {
  const [profile, setProfile] = useState({
    profilePic: '',
    name: '',
    nickname: '',
    birthday: '',
    state: '',
    bio: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data
    toggleProfile();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        profilePic: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="sm" className={styles.profilePage}>
      <form onSubmit={handleSubmit}>
        <div className={styles.avatarContainer}>
          <Avatar src={profile.profilePic} className={styles.avatar} />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className={styles.fileInput}
          />
        </div>
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nickname"
          name="nickname"
          value={profile.nickname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Birthday"
          name="birthday"
          type="date"
          value={profile.birthday}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="State"
          name="state"
          value={profile.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bio"
          name="bio"
          multiline
          rows={4}
          value={profile.bio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Interests"
          name="interests"
          value={profile.interests}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" className={styles.saveButton}>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default ProfilePage;


