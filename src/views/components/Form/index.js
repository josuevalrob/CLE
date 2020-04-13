import React from 'react';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import Form from './Form'
export const FormWithData = (props) => (
  <Query query={props.query} variables={{id:props.id}}>
    {({loading, error, data, refetch}) => {
      const handleComplete = () => refetch().then((x)=> props.history.push('/users'))
      debugger
      if(error) return `Error : ${error}` ;//* error validation
      if(loading) return <LinearProgress /> ;
      return !!data
        ? <Form data={Object.values(data)[0]} done={handleComplete} {...props} /> 
        : null
    }}
  </Query>
)

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
    })),
    header: PropTypes.shape(PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
    }))
  }),
};

export { default } from './Form';
