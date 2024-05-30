import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { Home } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faExternalLinkAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from './SideNavbar.module.css';

const SideNavbar = ({ isDarkMode, toggleDarkMode }) => {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: `${styles.drawerPaper} ${isDarkMode ? styles.dark : ''}` }}
    >
      <div className={styles.toolbar} />
      <List>
        <ListItem button>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText className="one" primary="Profile" />
        </ListItem>
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </ListItemIcon>
          <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
        </ListItem>
        
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href="https://empowerrecoverycenter.com/lp/rehab-treatment/?utm_source=gaw&utm_medium=cpc&campid=21294505412&adgid=161786524745&kwd=aa%20treatment%20center%20near%20me&mt=b&s&dev=c&dm=&nw=g&crid=699551634165&gad_source=1&gclid=CjwKCAjwgdayBhBQEiwAXhMxtuKgdrOueKQOrSQYFUumSv5C-KlcnJ-1l1XklCzltvdiTC2x03hyhxoCg2UQAvD_BwE" target="_blank">
          <ListItemIcon><FontAwesomeIcon icon={faExternalLinkAlt} /></ListItemIcon>
          <ListItemText primary="AA Info" />
        </ListItem>
      </List>
      <List>
        <ListItem button component="a" href="https://na.org/" target="_blank">
          <ListItemIcon><FontAwesomeIcon icon={faExternalLinkAlt} /></ListItemIcon>
          <ListItemText primary="NA Info" />
        </ListItem>
      </List>
      <ListItem>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          useOneTap
          render={(renderProps) => (
            <button className={styles.loginButton} onClick={renderProps.onClick}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </button>
          )}
        />
      </ListItem>
    </Drawer>
  );
};

export default SideNavbar;
