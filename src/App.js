import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Header from './components/Header/Header';
import useGoogleAuth from './api/authService';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { signIn, signOut, user } = useGoogleAuth();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <GoogleOAuthProvider clientId="551863709566-0ipt36927brc8nl0fc3q1d80er7k1jrt.apps.googleusercontent.com">
      <Router>
        <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
          <Header isDarkMode={isDarkMode} />
          <div className="mainContent">
            <SideNavbar 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              user={user} 
              signIn={signIn} 
              signOut={signOut}
            />
            <div className="content">
              <Switch>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
                <Route path="/" exact>
                  <HomePage isDarkMode={isDarkMode} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
