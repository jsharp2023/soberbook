import { useState } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

const useGoogleAuth = () => {
  const [user, setUser] = useState(null);

  const onSuccess = (tokenResponse) => {
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((profile) => {
        const userData = {
          name: profile.name,
          avatar: profile.picture,
        };
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };

  const onFailure = (error) => {
    console.log('Login failed:', error);
  };

  const signIn = useGoogleLogin({ onSuccess, onFailure });

  const signOut = () => {
    googleLogout();
    setUser(null);
  };

  return { signIn, signOut, user };
};

export default useGoogleAuth;
