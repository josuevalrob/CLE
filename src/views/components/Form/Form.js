import React from 'react';
import {HeaderForm, AllPageForm} from './HeaderForm'
import {useForm} from '../../../handlers/customHook';
import PropTypes from 'prop-types'
import {Mutation } from 'react-apollo'
import { handleVariables } from '../../../handlers/curries';
import {useStyles} from './styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {
  Button,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress
} from '@material-ui/core';

const CustomForm = ({data, config, mutation, done, history, schema, styles}) => {
  const classes= useStyles(styles);
  // const classesParent = makeStyles(config.stye)

  const {formState, handleChange} = useForm(
    !!data
      ? {...data} // maybe I should clean data...
      : config.fields.map(({key})=>({[key]:''})), 
    schema
  );
  const fakeDateEvent = (key) => (string) => fakeEventTrigger(string)(handleChange)(key)

  const handleForm = handleVariables(console.log)({input:formState.values});

  const hasError = field => !!(formState.touched[field] && formState.errors[field])
  return (
  <AllPageForm classes={classes} goBack={history && history.goBack} >
    <Mutation mutation={mutation} onCompleted={done} >
    { (graphQlCallback, { loading, error }) => {
      return (
      <form className={classes.form} onSubmit={(e)=>handleForm(e, graphQlCallback)} >
        <HeaderForm {...config.header} style={classes.title}/>
        <FormControl error={!!error} fullWidth>
        <Grid container spacing={12} >
        {!!error && <FormHelperText>{error.message}</FormHelperText>}
        {config.fields.map(({key, label, type, options, helper, disabled}) =>
          !type ? null :
          <Grid item xs={12} md={6} key ={key}>
            {
              type === 'text' || type === 'textArea' ?
                <TextField name={key}
                  fullWidth
                  disabled={disabled}
                  className={classes.textField}
                  error={hasError(key)}
                  helperText={ hasError(key) ? formState.errors[key][0] : null }
                  label={label}
                  onChange={handleChange}
                  type={type}
                  value={formState.values[key] || ''}
                  variant="outlined"
                  multiline={ type==='textArea' }
                  rowsMax={ type==='textArea' ? 4 : 1}
                />
              : type === 'select' ?
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel id={key} shrink className={classes.selectLabel}>{label}</InputLabel>
                  <Select
                    variant="outlined"
                    name={key}
                    labelId={key}
                    displayEmpty
                    className={classes.selectEmpty}
                    value={formState.values[key] || ''}
                    onChange={handleChange}
                  >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    { options.map(({key, label}) =>
                    <MenuItem value={key}>{label}</MenuItem>) }
                  </Select>
                  { helper && <FormHelperText>{helper}</FormHelperText> }
                </FormControl>
              : type === 'password' ?
                <TextField name={key}
                  disabled={disabled}
                  className={classes.textField}
                  error={hasError(key)}
                  helperText={ hasError(key) ? formState.errors[key][0] : null }
                  label={label}
                  onChange={handleChange}
                  type={type}
                  value={formState.values[key] || ''}
                  variant="outlined"
                />
              : type === 'date' ?
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    inputVariant="outlined"
                    id={`date-picker-dialog-${key}`}
                    label={label}
                    format="MM/dd/yyyy"
                    value={formState.values[key] || ''}
                    onChange={fakeDateEvent(key)}
                    KeyboardButtonProps={{'aria-label': 'change date'}}
                  />
                </MuiPickersUtilsProvider>
              : null
            }
          </Grid>
        )}
        </Grid>
        <Button
          className={classes.signUpButton}
          color="primary"
          disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          { loading ? <CircularProgress />
            : !!data ?  'Editar': 'Agregar' }
        </Button>
        </FormControl>
      </form>
      )}
    }
  </Mutation>
  </AllPageForm>
  )
}
CustomForm.propTypes = {
  history: PropTypes.object,
  clinet: PropTypes.object,
  //* Config props are required
  config: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.string,
    })).isRequired,
    header: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
    })
  }).isRequired,
};

export default CustomForm

const fakeEventTrigger = string => handler => key =>
  handler({
    persist: () => undefined,
    target: {
      name: key,
      type: 'date',
      value: string
    }
  })