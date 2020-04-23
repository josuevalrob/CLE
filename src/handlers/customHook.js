import {useState, useEffect} from 'react';
import validate from 'validate.js';

export const useForm = (values, schema) => {
  // refactor clean underscore type values
  Object.keys(values).forEach(key => {key[0] === '_' && delete values[key]})
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

export const useTableSelectors = (list) => {
  // ! should be a hook 🎣
  const [selectedObj, setSelectedObj] = useState([]);
  // ! should be a hook 🎣
  const handleSelectAll = event => {
    let selectedObj;
    if (event.target.checked) {
      selectedObj = list.map(guest => guest.id);
    } else {
      selectedObj = [];
    }
    setSelectedObj(selectedObj);
  };
  // ! should be a hook 🎣
  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedObj.indexOf(id);
    let newSelectedObj = [];

    if (selectedIndex === -1) {
      newSelectedObj = newSelectedObj.concat(selectedObj, id);
    } else if (selectedIndex === 0) {
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(1));
    } else if (selectedIndex === selectedObj.length - 1) {
      newSelectedObj = newSelectedObj.concat(selectedObj.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedObj = newSelectedObj.concat(
        selectedObj.slice(0, selectedIndex),
        selectedObj.slice(selectedIndex + 1)
      );
    }

    setSelectedObj(newSelectedObj);
  };

  return [
    selectedObj,
    handleSelectOne,
    handleSelectAll
  ]
}

export const usePagination = rowsPerPager => {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPager);
  const [page, setPage] = useState(0);
  //* handlers 🛠
  const handlePageChange = (_, page) => setPage(page);
  const handleRowsPerPageChange = event => setRowsPerPage(event.target.value);
  return {rowsPerPage, page, handlePageChange, handleRowsPerPageChange}
}