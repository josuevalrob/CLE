import {useState, useEffect} from 'react';
import validate from 'validate.js';

export const useForm = (values, schema) => {
  const initialState = {
    values,
    isValid: false,
    touched: {},
    errors: {}
  }
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [schema, formState.values]);

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

  return {
    formState,
    handleChange,
    reset: () => setFormState(initialState)
  };
}