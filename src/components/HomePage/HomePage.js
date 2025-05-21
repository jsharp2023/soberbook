import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../reducers/postSlice';
import NewPost from '../NewPost/NewPost';
import PostsContainer from '../PostsContainer/PostsContainer';
import SideNavbar from '../SideNavbar/SideNavbar';
import useGoogleAuth from '../../api/authService';
import { selectUserProfile } from '../../reducers/profileSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const profileUser = useSelector(selectUserProfile);
  const authUser = useSelector((state) => state.auth.user);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const { signIn, signOut } = useGoogleAuth();

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    return () => document.body.classList.remove('dark');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const mergedUser = {
    name: profileUser.name || authUser?.name,
    avatar: profileUser.avatar || authUser?.picture,
  };

  let content;
  if (postStatus === 'loading') {
    content = <p className="text-lg font-semibold text-center">Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = <PostsContainer />;
  } else if (postStatus === 'failed') {
    content = (
      <p className="text-lg font-semibold text-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <SideNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        user={mergedUser}
        signIn={signIn}
        signOut={signOut}
      />

      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-2xl">
          <NewPost isDarkMode={isDarkMode} />
          {content}
        </div>
      </div>

      {!mergedUser.name && (
        <button
          onClick={signIn}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default HomePage;
