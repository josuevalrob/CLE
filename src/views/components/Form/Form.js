import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {HeaderForm, AllPageForm, OptionsForm} from './HeaderForm'
import {useForm} from '../../../handlers/customHook';
import PropTypes from 'prop-types'
import { Button, TextField} from '@material-ui/core';
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
    { graphQlCallback => (
      <form className={classes.form} onSubmit={(e)=>handleForm(e, graphQlCallback)} >
        <HeaderForm {...config.header} style={classes.title}/>
        {config.fields.map(({key, label, type})=>
          <TextField name={key}
            className={classes.textField}
            error={hasError(key)}
            fullWidth
            helperText={
              hasError(key) ? formState.errors[key][0] : null
            }
            label={label}
            onChange={handleChange}
            type={type}
            value={formState.values[key] || ''}
            variant="outlined"
          />
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
          {!!data ?  'Editar': 'Agregar' }
        </Button>
        <OptionsForm rt={RouterLink} />
      </form>
      )
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
    header: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
    })).isRequired
  }).isRequired,
};

export default CustomForm