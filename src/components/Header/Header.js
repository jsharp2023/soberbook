import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'Protest Revolution, sans-serif',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" className={classes.title}>
          SOBERBOOK
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
