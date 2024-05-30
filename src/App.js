import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Header from './components/Header/Header';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLoginSuccess = (response) => {
    setUser(response);
    console.log('Login Success:', response);
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleLogout = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <Router>
      <Header />
      <SideNavbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
      <div className="auth-container">
        <h2>React Google Login</h2>
        {profile ? (
          <div>
            <img src={profile.picture} alt="user" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        )}
      </div>
    </Router>
  );
};

export default App;
