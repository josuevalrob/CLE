import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';

export const DeleteButton = ({mutation, id}) => {
  const [ deleteUser ] = useMutation(mutation);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser({ variables: { id } }).catch(console.log)
  }
  return (
  <Button style={{color:"red"}} onClick={handleDelete}>
    DELETE
  </Button>
  )
}

export const LinkButton = ({url, label, color = "primary"}) => (
  <Link to={url}>
    <Button color={color} variant="outlined" >
        {label}
    </Button>
  </Link>
)