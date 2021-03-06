import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const TurnoCard = props => {
  const { className, Turno, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Turno"
            className={classes.image}
            src={Turno.imageUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {Turno.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {Turno.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {Turno.duration}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <AssignmentIndIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {Turno.enrolled} Inscritos
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

TurnoCard.propTypes = {
  className: PropTypes.string,
  Turno: PropTypes.object.isRequired
};

export default TurnoCard;
