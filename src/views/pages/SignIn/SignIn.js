import React from 'react';
import {useForm} from '../../../handlers/customHook';
import {handleVariables} from '../../../handlers/curries';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import useStyles from './style'
import {schema} from './signInValidationSchema'
import {HalfPageImage} from './../../components'
import {Grid, Button, TextField, Link, Typography, CircularProgress, FormControl, FormHelperText } from '@material-ui/core';
import {signInMutation} from '../../../services/mutations'
import {Mutation} from 'react-apollo'
import {withAuthConsumer} from './../../../handlers/contexts/AuthStore'

const SignIn = ({ onUserChange }) => {
  const classes = useStyles();
  const {formState, handleChange, reset} = useForm({email:'',password:''}, schema);
  const handleSignIn = handleVariables(reset)(formState.values);

  const hasError = field => !!(formState.touched[field] && formState.errors[field])

  //* actualizamos el context, it will force the redirect!!
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
