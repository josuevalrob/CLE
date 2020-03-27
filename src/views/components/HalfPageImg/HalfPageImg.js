import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = ({url})=> makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: url,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  }
}));

const HalfPageImage = (props) => {
  const classes = useStyles(props)();
  return (
    <Grid className={classes.quoteContainer} item lg={5}>
      <div className={classes.quote}>
        <div className={classes.quoteInner}>
          <Typography className={classes.quoteText} variant="h1" >
            Que poco es una vida para darla,<br/>
            Que corta es junto a ti la eternidad
          </Typography>
          <div className={classes.person}>
            <Typography className={classes.name} variant="body1">
              "Buscaré tu rostro señor"
            </Typography>
            <Typography className={classes.bio} variant="body2">
              Hakuna
            </Typography>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default HalfPageImage