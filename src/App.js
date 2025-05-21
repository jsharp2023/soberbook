import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/AuthSlice';
import logo from './assets/logo.png';
import NewPost from './components/NewPost/NewPost';
import PostsContainer from './components/PostsContainer/PostsContainer';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleLoginSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    dispatch(setUser(decoded));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 dark:bg-blue-800 text-white shadow">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SoberBook Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold">SoberBook</h1>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-3 py-1 bg-white dark:bg-gray-700 text-blue-600 dark:text-white rounded shadow hover:bg-blue-100"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {!user && (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
            />
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-[220px] bg-blue-100 dark:bg-gray-900 text-blue-900 dark:text-white p-4">
  <nav className="flex flex-col space-y-4 text-lg font-medium">
    <a href="#" className="hover:text-blue-600 dark:hover:text-cyan-300">Home</a>
    <a href="#" className="hover:text-blue-600 dark:hover:text-cyan-300">Profile</a>
    <a href="https://www.aa.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-300">
      AA Info
    </a>
    <a href="https://www.na.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-cyan-300">
      NA Info
    </a>
  </nav>
</aside>


        {/* Main Content */}
        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to SoberBook</h2>
          <NewPost isDarkMode={isDarkMode} />
<PostsContainer />


        </main>
      </div>
    </div>
  );
};

export default App;
