import React from 'react';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import Form from './Form'
export const FormWithData = (props) => (
  <Query query={props.query} variables={{id:props.id}}>
    {({loading, error, data, refetch}) => {
      const handleComplete = () => refetch().then((x)=> props.history.push('/users'))
      if(error) return `Error : ${error}` ;//* error validation
      if(loading) return <LinearProgress /> ;
      return <Form data={data.getGust} done={handleComplete} {...props} />
    }}
  </Query>
)

FormWithData.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  config: PropTypes.objectOf.isRequired,
  schema: PropTypes.object,
  update: PropTypes.func,
  id: PropTypes.string,
};

export { default } from './Form';
