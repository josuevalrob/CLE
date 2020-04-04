import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '16em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${process.env.PUBLIC_URL}/banner.png)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
}));

const Invitation = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.quote}></div>
      <div className={classes.contentHeader}>
        <Link component={RouterLink}to="/signin"variant="h6">
        <IconButton ><ArrowBackIcon /></IconButton>
          Inicio de sesión
        </Link>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
      <Grid item lg={8} md={6} xl={4} xs={12}>  
        <Card className={classes.root} >
        <form autoComplete="off" noValidate >
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3} >
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  margin="dense"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  required
                  variant="outlined"
                />
                <Divider/>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  margin="dense"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows="5"
                  label="message"
                  margin="dense"
                  name="message"
                  onChange={handleChange}
                  required
                  value={values.message}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
            >
              Envíar Solicitud
            </Button>
          </CardActions>
        </form>
      </Card>
      </Grid>
      </Grid>
    </div>
  );
};

Invitation.propTypes = {
  history: PropTypes.object
};

export default withRouter(Invitation);
