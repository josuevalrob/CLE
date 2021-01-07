import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const AccountProfile = props => {
  const { className, user, ...rest } = props;
  const completeness = ((Object.values(user).filter(e => e !== null).length - 2) * (Object.keys(user).length -2));
  const classes = useStyles();
  return (
    <Card {...rest} className={clsx(classes.root, className)} >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.firstName}
            </Typography>
            <Typography className={classes.locationText} color="textSecondary" variant="body1">
              {user.rol}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {user.City}, {user.Country}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.profilePhoto}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">{`Profile Completeness: ${completeness}%`}</Typography>
          <LinearProgress
            value={completeness}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
