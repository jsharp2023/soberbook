import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from '@react-oauth/google';
import avatar from '../../assets/avatar.png';

const SideNavbar = ({ isDarkMode, toggleDarkMode, onProfileClick, user, signIn, signOut }) => {
  return (
    <aside className={`h-screen w-64 fixed left-0 top-0 p-6 overflow-y-auto z-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user?.avatar || avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-2 object-cover border border-gray-300"
        />
        <h2 className="text-lg font-semibold mb-2">{user?.name || 'Guest'}</h2>
        {!user ? (
          <GoogleLogin
            onSuccess={signIn}
            onError={() => console.log('Login Failed')}
          />
        ) : (
          <button
            onClick={signOut}
            className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-4 text-sm">
        <button
          onClick={onProfileClick}
          className="w-full flex items-center gap-2 px-4 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          <span className="text-blue-500">🏠</span>
          <span>Profile</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-2 px-4 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* External Links */}
      <div className="space-y-4 text-sm">
        <a
          href="https://empowerrecoverycenter.com/lp/rehab-treatment/?utm_source=gaw&utm_medium=cpc&campid=21294505412&adgid=161786524745&kwd=aa%20treatment%20center%20near%20me&mt=b&s&dev=c&dm=&nw=g&crid=699551634165&gad_source=1&gclid=CjwKCAjwgdayBhBQEiwAXhMxtuKgdrOueKQOrSQYFUumSv5C-KlcnJ-1l1XklCzltvdiTC2x03hyhxoCg2UQAvD_BwE"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2 px-4 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
          <span>AA Info</span>
        </a>

        <a
          href="https://na.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2 px-4 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
          <span>NA Info</span>
        </a>
      </div>
    </aside>
  );
};

export default SideNavbar;

