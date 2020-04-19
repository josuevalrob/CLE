import React from 'react';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Form from './Form';

export const FormWithData = (props) =>{
  //* hooks
  const { loading, error, data, refetch } = useQuery(props.query, {variables: { id:props.id }})

  //* handlers 
  const handleComplete = () => refetch().then((x)=> props.history.push(props.root))
  const handleByParent = flatterZero(props.dataHandler)

  //* Return
  if(error) return <Redirect to={props.root}/>;//* error validation
  if (loading) return <LinearProgress />;
  return <Form data={handleByParent(data)} done={handleComplete} {...props} />;
}

FormWithData.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  schema: PropTypes.object,
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

export { default } from './Form';

const flatterZero = objHandler => (data) => objHandler(flatter(0)(data))
const flatter = arrN => data => Object.values(data)[arrN]