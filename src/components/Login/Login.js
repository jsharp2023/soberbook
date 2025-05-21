import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwt_decode} from 'jwt-decode';
// Optional: Redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/AuthSlice'; // adjust path as needed

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Sign in with Google</h2>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          try {
            const decoded = jwt_decode(credentialResponse.credential);
            console.log('User info:', decoded);

            // Optional: save to Redux
            dispatch(setUser(decoded));
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
