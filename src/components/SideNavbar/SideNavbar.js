import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from '@react-oauth/google';
import styles from './SideNavbar.module.css';
import avatar from '../../assets/avatar.png';

const SideNavbar = ({ isDarkMode, toggleDarkMode, onProfileClick, user, signIn, signOut }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: `${styles.drawerPaper} ${isDarkMode ? styles.dark : ''}` }}
    >
      <div className={styles.toolbar} />
      <div className={styles.userInfo}>
        <Avatar alt="User Avatar" src={user ? user.avatar : avatar} className={styles.avatar} />
        <Typography variant="h6">{user ? user.name : 'Guest'}</Typography>
        {user ? (
          <Button onClick={signIn} variant="contained" color="primary" className={styles.googleLoginButton}>
            Sign In
          </Button>
        ) : (
          <GoogleLogin onSuccess={signIn} onError={() => console.log('Login Failed')} />
        )}
      </div>
      <List>
        <ListItem button onClick={onProfileClick}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={toggleDarkMode}>
          <ListItemIcon>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </ListItemIcon>
          <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
        </ListItem>
        <Divider />
        <ListItem button component="a" href="https://empowerrecoverycenter.com/lp/rehab-treatment/?utm_source=gaw&utm_medium=cpc&campid=21294505412&adgid=161786524745&kwd=aa%20treatment%20center%20near%20me&mt=b&s&dev=c&dm=&nw=g&crid=699551634165&gad_source=1&gclid=CjwKCAjwgdayBhBQEiwAXhMxtuKgdrOueKQOrSQYFUumSv5C-KlcnJ-1l1XklCzltvdiTC2x03hyhxoCg2UQAvD_BwE" target="_blank">
          <ListItemIcon><FontAwesomeIcon icon={faExternalLinkAlt} /></ListItemIcon>
          <ListItemText primary="AA Info" />
        </ListItem>
        <ListItem button component="a" href="https://na.org/" target="_blank">
          <ListItemIcon><FontAwesomeIcon icon={faExternalLinkAlt} /></ListItemIcon>
          <ListItemText primary="NA Info" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
