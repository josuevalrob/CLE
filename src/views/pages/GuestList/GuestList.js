import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { GuestsToolbar, GuestsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const GuestList = () => {
  const classes = useStyles();

  const [guests] = useState(mockData);

  return (
    <div className={classes.root}>
      <GuestsToolbar />
      <div className={classes.content}>
        <GuestsTable guests={guests} />
      </div>
    </div>
  );
};

export default GuestList;
