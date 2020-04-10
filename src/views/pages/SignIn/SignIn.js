import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import useStyles from './style'
import {HalfPageImage} from './../../components'
import {schema} from './signInValidationSchema'
import {Grid, Button, TextField, Link, Typography, CircularProgress, FormControl, FormHelperText } from '@material-ui/core';
import {signInMutation} from '../../../services/mutations'
import {Mutation} from 'react-apollo'
import {withAuthConsumer} from './../../../handlers/contexts/AuthStore'
const initialState = {
  isValid: false,
  values: {email:'',password:''},
  touched: {},
  errors: {}
}
const SignIn = ({ onUserChange }) => {
  const classes = useStyles();
  // TODO create a custom hook 🎣
  const [formState, setFormState] = useState(initialState);
  // const [isLoading, setLoader] = useState(false)
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async (event, graphQlCallback) => {
    event.preventDefault();
    try {
      await graphQlCallback({ variables: formState.values})
    } catch (event) {
      setFormState(initialState)
    }
  };

  const hasError = field => !!(formState.touched[field] && formState.errors[field])

  //* actualizamos el context, it will make the redirect!! 
  const handleComplete = ({login:{user}})=> onUserChange(user);

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <HalfPageImage url={`url(${process.env.PUBLIC_URL}/auth.png)`}/>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.topRight}>
              <Typography color="textSecondary" variant="body1">
                No tienes cuenta?{' '}
                <Link component={RouterLink} to="/inviteme" variant="h6">
                  Solicita una invitación
                </Link>
              </Typography>
            </div>
            <div className={classes.contentBody}>
            <Mutation mutation={signInMutation} onCompleted={handleComplete} >
            { (graphQlCallback, { loading, error }) => (
              <form className={classes.form} onSubmit={ e => handleSignIn(e, graphQlCallback)}>
                <FormControl error={!!error} fullWidth>
                <Typography className={classes.title} variant="h2">
                  <span role='img' aria-label='hello'>👋</span> Hey!, bienvenido de nuevo!
                </Typography>
                <Typography color="textSecondary" gutterBottom >
                  Accede a gestionar tus turnos!
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={hasError('email') ? formState.errors.email[0] : null}
                  label="Correo Electrónico"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={hasError('password') ? formState.errors.password[0] : null}
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password}
                  variant="outlined"
                />
                {!!error && <FormHelperText>El usuario o la contraseña son incorrectos</FormHelperText>}
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {
                    loading
                    ? <CircularProgress />
                    : 'Inicia Sesión'
                  }
                </Button>
                <Typography color="textSecondary" variant="body1" >
                  No recuerdas tu contraseña?{' '}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Recuperar Contraseña
                  </Link>
                </Typography>
                </FormControl>
              </form>
            )}
            </Mutation>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(withAuthConsumer(SignIn));
