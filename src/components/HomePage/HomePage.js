import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import { fetchPosts } from '../../reducers/postSlice';
import NewPost from '../NewPost/NewPost';
import PostsContainer from '../PostsContainer/PostsContainer';
import SideNavbar from '../SideNavbar/SideNavbar';
import ProfilePage from '../ProfilePage/ProfilePage';
import useGoogleAuth from '../../api/authService';
import styles from './HomePage.module.css';
import { selectUserProfile } from '../../reducers/profileSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const userProfile = useSelector(selectUserProfile);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { signIn, signOut } = useGoogleAuth();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleProfileOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileModalOpen(false);
  };

  let content;

  if (postStatus === 'loading') {
    content = <Typography variant="h6">Loading...</Typography>;
  } else if (postStatus === 'succeeded') {
    content = <PostsContainer />;
  } else if (postStatus === 'failed') {
    content = <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <SideNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onProfileClick={handleProfileOpen}
        user={userProfile}
        signIn={signIn}
        signOut={signOut}
      />
      <div className={styles.content}>
        <Container>
          <NewPost isDarkMode={isDarkMode} />
          {content}
        </Container>
      </div>
      <ProfilePage
        open={isProfileModalOpen}
        handleClose={handleProfileClose}
        user={userProfile}
      />
      {!userProfile.name && (
        <Button onClick={signIn} variant="contained" color="primary">
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default HomePage;

