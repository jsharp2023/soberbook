import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="551863709566-0ipt36927brc8nl0fc3q1d80er7k1jrt.apps.googleusercontent.com">
      <App />
      
    </GoogleOAuthProvider>
  </Provider>

);

