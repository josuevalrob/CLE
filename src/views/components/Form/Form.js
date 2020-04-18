import React from 'react';
import {HeaderForm, AllPageForm} from './HeaderForm'
import {useForm} from '../../../handlers/customHook';
import PropTypes from 'prop-types'
import { Button, FormHelperText, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress} from '@material-ui/core';
import {Mutation } from 'react-apollo'
import { handleVariables } from '../../../handlers/curries';
import {useStyles} from './styles'
const CustomForm = ({data, config, mutation, done, history, schema}) => {
  const classes= useStyles()
  const {formState, handleChange} = useForm(
    !!data
      ? {...data} // maybe I should clean data...
      : config.fields.map(({key})=>({[key]:''})), 
    schema
  );

  const handleForm = handleVariables()(formState.values);

  const hasError = field => !!(formState.touched[field] && formState.errors[field])

  return (
  <AllPageForm classes={classes} goBack={() => history.goBack()} >
    <Mutation mutation={mutation} onCompleted={done} >
    { (graphQlCallback, { loading, error }) => {
      return (
      <form className={classes.form} onSubmit={(e)=>handleForm(e, graphQlCallback)} >
        <HeaderForm {...config.header} style={classes.title}/>
        <FormControl error={!!error} fullWidth>
        {!!error && <FormHelperText>{error}</FormHelperText>}
        {config.fields.map(({key, label, type, options, helper})=>
          ! type ? null
          : type === 'text' || type === 'textArea' ?
            <TextField name={key} key={key}
              className={classes.textField}
              error={hasError(key)}
              fullWidth
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
            <FormControl variant="filled" className={classes.formControl} key={key}>
              <InputLabel id={key} shrink className={classes.selectLabel}>{label}</InputLabel>
              <Select
                variant="outlined"
                name={key}
                labelId={key}
                displayEmpty
                className={classes.selectEmpty}
                value={formState.values[key]}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                { options.map(({key, label}) =>
                <MenuItem key={key} value={key}>{label}</MenuItem>) }
              </Select>
              { helper && <FormHelperText>{helper}</FormHelperText> }
            </FormControl>
          : null

        )}
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
  history: PropTypes.object.isRequired,
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
    }).isRequired
  }).isRequired,
};

export default CustomForm