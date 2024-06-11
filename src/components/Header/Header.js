import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../../assets/logo.png'; // Adjust the path as needed

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Protest Revolution, sans-serif',
  },
  logo: {
    width: 180,
    height: 160, // Adjust the size as needed
  },
  darkAppBar: {
    backgroundColor: '#333', // Dark mode background color
    color: '#fff', // Dark mode text color
    zIndex: 10, // Ensure header is in front
    position: 'relative', // Ensure position context
  },
  lightAppBar: {
    backgroundColor: '#3f51b5', // Light mode background color
    color: '#fff', // Light mode text color
    zIndex: 10, // Ensure header is in front
    position: 'relative', // Ensure position context
  },
}));

const Header = ({ isDarkMode }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={isDarkMode ? classes.darkAppBar : classes.lightAppBar}>
      <Toolbar>
        <img src={logo} alt="SoberBook Logo" className={classes.logo} />
        <Typography variant="h3" className={classes.title}>
          SOBERBOOK
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
