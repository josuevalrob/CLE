import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import {requestAccess} from '../../../services/mutations'
import {schema} from './invitationValidationSchema'
import {Mutation} from 'react-apollo'
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
  LinearProgress,
  FormControl,
  Typography,
  Modal,
  FormHelperText
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useStyles, getModalStyle} from './styles';

const initialState = {
  values: {email:'', firstName:'', letter:''},
  isValid: false,
  touched: {},
  errors: {}
}

const Invitation = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // ! THIS MUST BE ACUSTOM HOOK!! 🎣
  const [formState, setFormState] = useState(initialState);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleInvitation = async (event, graphQlCallback) => {
    event.preventDefault();
    try {
      await graphQlCallback({ variables: { input: formState.values } });
    } catch (event) {
      setFormState(initialState)
    }
  };

  const closeModal = () => {
    setOpen(false);
    setFormState(initialState);
  }

  return (
    <div className={classes.root}>
      <div className={classes.quote}></div>
      <div className={classes.contentHeader}>
        <Link component={RouterLink}to="/signin"variant="h6">
        <IconButton ><ArrowBackIcon /></IconButton>
          Inicio de sesión
        </Link>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
      <Grid item lg={8} md={6} xl={4} xs={12}> 
        <Card className={classes.root} >
        <Mutation mutation={requestAccess} onCompleted={() => setOpen(true)} >
        { (graphQlCallback, { loading, error }) => (
          <form autoComplete="off" noValidate onSubmit={ e => handleInvitation(e, graphQlCallback)}>
            <FormControl error={!!error} fullWidth>
              <CardHeader 
                title="Formulario de contaco" 
                subheader=" Dirigido al administrador de los campamentos.
                            Porfavor, solo envía una vez este formulario."
              />
              <Divider />
              <CardContent>
                <Grid container spacing={6} >
                  <Grid item md={4} xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      margin="dense"
                      name="firstName"
                      onChange={handleChange}
                      value={formState.values.firstName}
                      required
                      variant="outlined"
                    />
                    <Divider/>
                    {!!error && <FormHelperText>El correo ya existe</FormHelperText>}
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      margin="dense"
                      name="email"
                      onChange={handleChange}
                      required
                      value={formState.values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows="5"
                      label="message"
                      margin="dense"
                      name="letter"
                      onChange={handleChange}
                      required
                      value={formState.values.letter}
                      variant="outlined"
                    />
                  </Grid>
                {error && 
                <Grid item >
                  <FormHelperText>
                    Con el fin de poder invitarte a la plataforma hemos almacenamos tu e-mail.
                    Por lo que no es necesario enviar el formulario nuevamente.
                    Si ya has enviado una solicitud y no te han atendido,
                    llama al +34 0931406334
                  </FormHelperText>
                </Grid>
                }
                </Grid>
              </CardContent>
              <Divider />
              {loading && <LinearProgress /> }
              <CardActions>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                disabled={!formState.isValid}
              >
                Envíar Solicitud
              </Button>
            </CardActions>
            </FormControl>
          </form>
        )}
        </Mutation>
        </Card>
      </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="form-response"
        aria-describedby="invitation-status"
      >
        <Card  style={modalStyle} className={classes.paper}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Todo correcto!
            </Typography>
            <Typography variant="h5" component="h2">
              Gracias {formState.values.firstName}
            </Typography>
            <Typography variant="body2" component="p">
              Lo más pronto posible un gestor se pondrá en contacto contigo.
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default withRouter(Invitation);
